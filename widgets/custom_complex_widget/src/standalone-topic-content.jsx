import React, {
	useEffect,
	useState,
	useMemo,
	useCallback,
} from "https://esm.sh/react@19.1.0";
import { createRoot } from "https://esm.sh/react-dom@19.1.0/client";

// ============================================================================
// DATA FETCHING & PROCESSING
// ============================================================================

const processTopicsData = (json) => {
	if (!json.topics || !Array.isArray(json.topics)) return [];

	const authors = json.authors || {};

	return json.topics.map((raw, index) => {
		const item = { ...raw };
		const author = item?.author || {};
		const authorDetails = authors[author.id] || {};

		return {
			id: item?.id || `fallback-${index}`,
			title: item?.title || "Untitled",
			description: item?.content || "",
			imageUrl: item?.featuredImage,
			author: {
				name: authorDetails.name || author.username || "Unknown",
				avatarUrl: authorDetails.avatar || author.avatar,
				role: authorDetails.userTitle,
				url: authorDetails.url,
			},
			stats: {
				likes: item.likes ?? 0,
				views: item.views ?? 0,
				comments: item.replyCount ?? 0,
			},
			publishedAt: item.lastActivityAtRelative || item.publishedAt || "",
			category: item.categoryName,
			categoryUrl: item.categoryUrl,
			topicUrl: item.topicUrl,
			contentType: item.contentType || "conversation",
		};
	});
};

const PAGE_SIZE = 8;

const fetchTopics = async (filter = {}, page = 1) => {
	try {
		const pageSize = PAGE_SIZE;
		const res = await fetch("/contentNavigation/topics", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-TOKEN": "dummy",
				"x-requested-with": "XMLHttpRequest",
			},
			body: JSON.stringify({
				sort: {
					lastActivityAt: "desc",
				},
				pagination: { page, pageSize },
				filters: { category: null, ...filter },
			}),
		});

		if (res.ok) {
			const json = await res.json();
			const processedTopics = processTopicsData(json);

			console.log("API Response:", {
				rawTopicsCount: json.topics?.length || 0,
				processedTopicsCount: processedTopics.length,
				filter: filter,
				topics: processedTopics.map((t) => ({
					id: t.id,
					title: t.title,
				})),
			});

			return processedTopics;
		}

		console.log("API call failed, returning empty array");
		return [];
	} catch (error) {
		console.log(
			"Error fetching from API, returning empty array:",
			error.message
		);
		return [];
	}
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TopicContent = () => {
	const [topics, setTopics] = useState([]);
	const [hasBestAnswer, setHasBestAnswer] = useState(false);
	const [isLoadingInitial, setIsLoadingInitial] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [page, setPage] = useState(1);
	const [lastFetchCount, setLastFetchCount] = useState(PAGE_SIZE);

	const handleFilterToggle = useCallback(() => {
		setHasBestAnswer((prev) => !prev);
	}, []);

	// Reset on filter change
	useEffect(() => {
		setIsLoadingInitial(true);
		setTopics([]);
		setPage(1);
		const filter = hasBestAnswer ? { bestAnswer: true } : {};
		fetchTopicsWithPage(1, filter, true, true);
		// eslint-disable-next-line
	}, [hasBestAnswer]);

	const fetchTopicsWithPage = useCallback(
		async (pageToFetch, filter, isReset = false, isInitial = false) => {
			const { page, ...filterWithoutPage } = filter || {};
			const data = await fetchTopics(
				{ ...filterWithoutPage },
				pageToFetch
			);
			setLastFetchCount(data.length);
			if (isReset) {
				setTopics(data);
			} else {
				setTopics((prev) => [...prev, ...data]);
			}
			if (isInitial) {
				setIsLoadingInitial(false);
			} else {
				setIsLoadingMore(false);
			}
		},
		[]
	);

	const handleShowMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		setIsLoadingMore(true);
		const filter = hasBestAnswer ? { bestAnswer: true } : {};
		fetchTopicsWithPage(nextPage, filter, false, false);
	};

	useEffect(() => {
		// Initial load
		const filter = hasBestAnswer ? { bestAnswer: true } : {};
		fetchTopicsWithPage(page, filter, page === 1, true);
		// eslint-disable-next-line
	}, []);

	const validTopics = useMemo(() => {
		const filtered = topics.filter(
			(topic) => topic && typeof topic === "object" && topic.id
		);
		console.log("Rendering topics:", {
			originalCount: topics.length,
			validCount: filtered.length,
			topics: filtered.map((t) => ({ id: t.id, title: t.title })),
		});
		return filtered;
	}, [topics]);

	return (
		<div style={styles.container}>
			{/* Tab bar with filter */}
			<div style={styles.tabBar}>
				<button style={{ ...styles.tab, ...styles.activeTab }}>
					Recently active
				</button>
				<FilterToggle
					hasBestAnswer={hasBestAnswer}
					onToggle={handleFilterToggle}
				/>
			</div>

			{/* Initial loading state */}
			{isLoadingInitial ? (
				<div style={styles.loadingContainer}>
					<LoadingSpinner />
				</div>
			) : (
				<div>
					{validTopics.map((topic, idx) => (
						<TopicCard
							key={topic.id}
							topic={topic}
							isLast={idx === validTopics.length - 1}
						/>
					))}
					{/* Show more button */}
					{lastFetchCount === PAGE_SIZE && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								margin: "24px 0",
							}}
						>
							<button
								style={styles.showMoreButtonStyles}
								onClick={handleShowMore}
								disabled={isLoadingMore}
							>
								{isLoadingMore ? (
									<LoadingSpinner width={24} height={24} />
								) : (
									"Show more activity"
								)}
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

// ============================================================================
// STYLES - Organized by component for better maintainability
// ============================================================================

const styles = {
	// Layout & Container styles
	container: {
		maxWidth: 800,
		minHeight: 500,
		width: "100%",
		margin: "0",
		padding: 0,
		background: "#f8fafc",
		borderRadius: 12,
		boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
	},

	// Loading styles
	loadingContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "60px 20px",
		minHeight: 200,
	},

	// Tab bar styles
	tabBar: {
		display: "flex",
		alignItems: "center",
		borderBottom: "1.5px solid #e0e4ea",
		background: "#f8fafc",
		borderRadius: "10px 10px 0 0",
		padding: "0 0 0 8px",
		marginBottom: 8,
		height: 48,
		width: "100%",
		boxSizing: "border-box",
		whiteSpace: "nowrap",
		minWidth: 0,
		position: "relative",
	},
	tab: {
		fontWeight: 500,
		fontSize: 16,
		color: "#6b7a90",
		background: "none",
		border: "none",
		outline: "none",
		padding: "0 18px",
		height: 48,
		display: "flex",
		alignItems: "center",
		cursor: "default",
		borderBottom: "2.5px solid transparent",
		borderRadius: "10px 10px 0 0",
		transition: "color 0.2s",
	},
	activeTab: {
		color: "#26334d",
		borderBottom: "2.5px solid #3b82f6",
		cursor: "default",
	},

	// Filter toggle styles
	filterToggle: {
		display: "flex",
		alignItems: "center",
		gap: 6,
		cursor: "pointer",
		userSelect: "none",
		color: "#26334d",
		fontWeight: 500,
		fontSize: 16,
		marginRight: 12,
		flexShrink: 0,
		position: "absolute",
		right: 12,
		top: 0,
		height: "100%",
	},
	checkbox: {
		display: "inline-block",
		width: 18,
		height: 18,
		background: "#fff",
		border: "1.5px solid #bfc8d6",
		borderRadius: 4,
		marginRight: 4,
		boxSizing: "border-box",
		position: "relative",
	},
	checkboxChecked: {
		background: "#3b82f6",
	},
	checkmark: {
		position: "absolute",
		top: 1,
		left: 1,
	},

	// Card styles
	card: {
		borderBottom: "1px solid #e0e4ea",
		padding: "14px 18px 10px 18px",
		background: "#f8fafc",
		boxShadow: "none",
		display: "flex",
		flexDirection: "row",
		gap: 14,
		alignItems: "flex-start",
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: "50%",
		objectFit: "cover",
		border: "none",
		fontWeight: 700,
		fontSize: 10,
	},
	avatarFallback: {
		background: "#a3d8f4",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 12,
		fontWeight: 700,
		color: "#fff",
		width: 32,
		height: 32,
		borderRadius: "50%",
	},
	content: {
		flex: 1,
		minWidth: 0,
		textAlign: "left",
		paddingLeft: 8,
	},

	// Meta information styles
	meta: {
		fontSize: 13,
		color: "#6b7a90",
		marginBottom: 0,
		display: "flex",
		alignItems: "center",
		gap: 6,
		flexWrap: "wrap",
	},
	name: {
		fontWeight: 500,
		color: "#1976d2",
		cursor: "pointer",
		marginRight: 4,
	},
	role: {
		color: "#a7aeb5ff",
		fontWeight: 500,
		marginRight: 4,
	},
	category: {
		color: "#1976d2",
		fontWeight: 500,
		marginLeft: 4,
		textDecoration: "underline dotted",
		fontStyle: "italic",
		cursor: "pointer",
	},
	contentTypeLabel: {
		color: "#888",
		fontStyle: "italic",
		marginRight: 4,
	},

	// Title and description styles
	titleContainer: {
		display: "flex",
		alignItems: "center",
		gap: 6,
		marginBottom: 2,
		marginTop: 10,
	},
	title: {
		fontWeight: 500,
		fontSize: 16,
		opacity: 0.7,
		marginBottom: 0,
		color: "#1a1a1aff",
		lineHeight: 1.2,
		display: "inline-block",
	},
	questionIcon: {
		color: "#f5b400",
		fontSize: 12,
		marginLeft: 2,
		verticalAlign: "middle",
	},
	description: {
		color: "#1a1a1aff",
		fontSize: 14,
		margin: "4px 0 0 0",
		lineHeight: 1.4,
		// Clamp to 2 lines with ellipsis
		overflow: "hidden",
		textOverflow: "ellipsis",
		display: "-webkit-box",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
	},

	// Stats styles
	stats: {
		display: "flex",
		alignItems: "center",
		gap: 24,
		height: 28,
		fontSize: 12,
		color: "#888",
		marginTop: 12,
		marginBottom: 0,
		justifyContent: "flex-start",
	},
	statItem: {
		display: "flex",
		alignItems: "center",
		gap: 4,
		color: "#999",
		fontSize: 12,
		fontWeight: 400,
		lineHeight: 1,
		height: 28,
	},
	statLink: {
		textDecoration: "none",
		color: "#999",
	},
	authorInfo: {
		display: "flex",
		alignItems: "center",
		gap: 6,
		height: 28,
		marginLeft: 12,
	},
	authorAvatar: {
		width: 22,
		height: 22,
		borderRadius: "50%",
		objectFit: "cover",
		marginRight: 2,
	},
	authorAvatarFallback: {
		width: 22,
		height: 22,
		borderRadius: "50%",
		background: "#a3d8f4",
		color: "#fff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: 700,
		fontSize: 12,
		marginRight: 2,
	},

	// Image styles
	image: {
		width: 140,
		height: 90,
		objectFit: "cover",
		borderRadius: 8,
		border: "1.5px solid #e0e4ea",
	},

	// Divider styles
	divider: {
		height: 1,
		background: "#e0e4ea",
		margin: "0 0 0 62px",
		border: "none",
	},

	statIcon: {
		width: 16,
		height: 16,
		display: "inline-block",
		verticalAlign: "middle",
	},

	showMoreButtonStyles: {
		appearance: "none",
		backgroundColor: "rgb(42, 170, 225)",
		border: "none",
		borderRadius: "3px",
		boxShadow:
			"rgb(42, 170, 225) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
		boxSizing: "border-box",
		color: "rgb(255, 255, 255)",
		cursor: "pointer",
		display: "inline-block",
		fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
		fontSize: "14px",
		fontWeight: 400,
		height: "48px",
		letterSpacing: "normal",
		lineHeight: "48px",
		margin: 0,
		minWidth: "70px",
		outline: "none",
		padding: "0 16px",
		textAlign: "center",
		textDecoration: "none",
		transition: "all 0.2s ease",
		userSelect: "none",
		whiteSpace: "nowrap",
		width: "692px",
		WebkitFontSmoothing: "antialiased",
		marginBottom: 18,
	},
};

// ============================================================================
// SVG ICONS - Optimized and reusable
// ============================================================================

const Icon = ({ children, style, ...props }) => (
	<svg style={style} role='presentation' {...props}>
		{children}
	</svg>
);

const LikeIcon = ({ style }) => (
	<Icon viewBox='0 0 16 16' style={style}>
		<path
			d='M6.5 14.5V6.5L10.5 2.5C10.7761 2.22386 11.2239 2.22386 11.5 2.5C11.7761 2.77614 11.7761 3.22386 11.5 3.5L8.5 6.5H13C13.5523 6.5 14 6.94772 14 7.5V13C14 13.5523 13.5523 14 13 14H7C6.72386 14 6.5 14.2239 6.5 14.5Z'
			fill='currentColor'
		/>
		<rect x='2' y='7' width='3' height='7' rx='1' fill='currentColor' />
	</Icon>
);

const EyeIcon = ({ style }) => (
	<Icon viewBox='0 0 16 16' style={style}>
		<path
			d='M8 3C4.686 3 1.865 5.272 0.667 8C1.865 10.728 4.686 13 8 13C11.314 13 14.135 10.728 15.333 8C14.135 5.272 11.314 3 8 3ZM8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5ZM8 6C6.895 6 6 6.895 6 8C6 9.105 6.895 10 8 10C9.105 10 10 9.105 10 8C10 6.895 9.105 6 8 6Z'
			fill='currentColor'
		/>
	</Icon>
);

const CommentIcon = ({ style }) => (
	<Icon viewBox='0 0 16 16' style={style}>
		<path
			d='M14 2H2C1.44772 2 1 2.44772 1 3V15L4 12H14C14.5523 12 15 11.5523 15 11V3C15 2.44772 14.5523 2 14 2Z'
			fill='currentColor'
		/>
	</Icon>
);

const CheckmarkIcon = () => (
	<Icon width='14' height='14' viewBox='0 0 14 14' style={styles.checkmark}>
		<polyline
			points='2,7 6,11 12,3'
			style={{
				fill: "none",
				stroke: "#fff",
				strokeWidth: 2,
			}}
		/>
	</Icon>
);

const LoadingSpinner = ({
	width = 48,
	height = 48,
	color = "#3b82f6",
	customClass = "",
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={customClass}
		style={{
			animation: "spin 1s linear infinite",
		}}
	>
		<style>
			{`
				@keyframes spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
			`}
		</style>
		<path
			d='M12.0012 24C10.3815 24 8.80867 23.6836 7.32962 23.0578C5.8998 22.4531 4.61764 21.5859 3.51597 20.4844C2.4143 19.3828 1.54703 18.1008 0.94228 16.6711C0.316437 15.1922 0 13.6195 0 12C0 11.5336 0.377381 11.1562 0.843832 11.1562C1.31028 11.1562 1.68766 11.5336 1.68766 12C1.68766 13.3922 1.95957 14.7422 2.49868 16.0148C3.01904 17.243 3.76209 18.3469 4.70905 19.2938C5.65602 20.2406 6.76003 20.9859 7.98828 21.5039C9.25872 22.0406 10.6088 22.3125 12.0012 22.3125C13.3935 22.3125 14.7436 22.0406 16.0164 21.5016C17.2447 20.9813 18.3487 20.2383 19.2956 19.2914C20.2426 18.3445 20.988 17.2406 21.506 16.0125C22.0428 14.7422 22.3147 13.3922 22.3147 12C22.3147 10.6078 22.0428 9.25781 21.5037 7.98516C20.9851 6.75998 20.2345 5.64659 19.2933 4.70625C18.3539 3.76387 17.2401 3.01321 16.0141 2.49609C14.7436 1.95938 13.3935 1.6875 12.0012 1.6875C11.5347 1.6875 11.1573 1.31016 11.1573 0.84375C11.1573 0.377344 11.5347 0 12.0012 0C13.6209 0 15.1937 0.316406 16.6727 0.942188C18.1025 1.54688 19.3847 2.41406 20.4864 3.51562C21.588 4.61719 22.453 5.90156 23.0577 7.32891C23.6836 8.80781 24 10.3805 24 12C24 13.6195 23.6836 15.1922 23.0577 16.6711C22.4553 18.1008 21.588 19.3828 20.4864 20.4844C19.3847 21.5859 18.1002 22.4508 16.6727 23.0555C15.1937 23.6836 13.6209 24 12.0012 24Z'
			fill={color}
		/>
	</svg>
);

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const Avatar = ({ author, size = 32, style = {} }) => {
	const avatarStyle = size === 32 ? styles.avatar : styles.authorAvatar;
	const fallbackStyle =
		size === 32 ? styles.avatarFallback : styles.authorAvatarFallback;

	if (author.avatarUrl) {
		return (
			<img
				src={author.avatarUrl}
				alt={author.name || ""}
				style={{ ...avatarStyle, ...style }}
			/>
		);
	}

	return (
		<div style={{ ...fallbackStyle, ...style }}>
			{getInitials(author.name || author.username)}
		</div>
	);
};

const StatItem = ({ icon: Icon, value, href, style = {} }) => {
	const content = (
		<>
			<Icon style={styles.statIcon} />
			<span style={{ marginLeft: 4 }}>{value}</span>
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				style={{ ...styles.statLink, ...style }}
			>
				{content}
			</a>
		);
	}

	return <span style={{ ...styles.statItem, ...style }}>{content}</span>;
};

const TopicCard = ({ topic, isLast }) => {
	const { author, stats, topicUrl } = topic;
	const hasLink = topicUrl?.destination;

	return (
		<>
			<div style={styles.card}>
				<Avatar author={author} />

				<div style={styles.content}>
					{/* Meta information */}
					<div style={styles.meta}>
						{author.url ? (
							<a
								href={author.url}
								target='_blank'
								rel='noopener noreferrer'
								style={styles.name}
							>
								{author.name || author.username || ""}
							</a>
						) : (
							<span style={styles.name}>
								{author.name || author.username || ""}
							</span>
						)}

						{author.role && (
							<span style={styles.role}>{author.role}</span>
						)}

						<span style={styles.contentTypeLabel}>
							{getContentTypeLabel(topic.contentType)}
						</span>

						{topic.category && topic.categoryUrl ? (
							<a
								href={topic.categoryUrl}
								target='_blank'
								rel='noopener noreferrer'
								style={styles.category}
							>
								{topic.category}
							</a>
						) : (
							topic.category && (
								<span style={styles.category}>
									{topic.category}
								</span>
							)
						)}
					</div>

					{/* Title */}
					<div style={styles.titleContainer}>
						{hasLink ? (
							<a
								href={topicUrl.destination}
								target='_blank'
								rel='noopener noreferrer'
								style={styles.title}
							>
								{topic.title}
							</a>
						) : (
							<div style={styles.title}>{topic.title}</div>
						)}

						{topic.contentType === "question" && (
							<span style={styles.questionIcon}>❓</span>
						)}
					</div>

					{/* Description */}
					{hasLink ? (
						<a
							href={topicUrl.destination}
							target='_blank'
							rel='noopener noreferrer'
							style={{
								...styles.description,
								textDecoration: "none",
								paddingTop: 8,
							}}
						>
							{stripHtmlTags(topic.description)}
						</a>
					) : (
						<div style={styles.description}>
							{stripHtmlTags(topic.description)}
						</div>
					)}

					{/* Stats */}
					<div style={styles.stats}>
						<StatItem icon={LikeIcon} value={stats.likes} />

						<StatItem
							icon={EyeIcon}
							value={stats.views}
							href={hasLink ? topicUrl.destination : null}
						/>

						<StatItem
							icon={CommentIcon}
							value={stats.comments}
							href={hasLink ? topicUrl.destination : null}
						/>

						<div style={styles.authorInfo}>
							<Avatar author={author} size={22} />
							{topic.publishedAt}
						</div>
					</div>
				</div>

				{topic.imageUrl && (
					<img
						src={topic.imageUrl}
						alt='topic'
						style={styles.image}
					/>
				)}
			</div>

			{!isLast && <hr style={styles.divider} />}
		</>
	);
};

const FilterToggle = ({ hasBestAnswer, onToggle }) => (
	<div style={styles.filterToggle} onClick={onToggle}>
		<span
			style={{
				...styles.checkbox,
				...(hasBestAnswer && styles.checkboxChecked),
			}}
		>
			{hasBestAnswer && <CheckmarkIcon />}
		</span>
		Has best answer
	</div>
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const stripHtmlTags = (html) => html.replace(/<[^>]+>/g, "");

const getInitials = (name) => (name || "?").charAt(0).toUpperCase();

const getContentTypeLabel = (contentType) => {
	switch (contentType) {
		case "question":
			return "Asked in";
		case "conversation":
			return "Posted in";
		default:
			return "Published in";
	}
};

// ============================================================================
// RENDER
// ============================================================================

createRoot(document.getElementById("widget_root_topic")).render(
	<TopicContent />
);
