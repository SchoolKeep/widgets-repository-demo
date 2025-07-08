/* eslint-disable */
import React, { useEffect, useState, useMemo, useCallback } from "react";

// ============================================================================
// DATA FETCHING & PROCESSING
// ============================================================================

const PAGE_SIZE = 8;
const tabBarStyle = {
	display: "flex",
	alignItems: "center",
	borderBottom: "1.5px solid #e0e4ea",
	background: "#f8fafc",
	borderRadius: "10px 10px 0 0",
	padding: "0 0 0 8px",
	marginBottom: 8,
	height: 48,
	gap: 8,
};
const tabStyle = {
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
};
const activeTabStyle = {
	...tabStyle,
	color: "#26334d",
	borderBottom: "2.5px solid #3b82f6",
	cursor: "default",
};
const cardStyle = {
	borderBottom: "1px solid #e0e4ea",
	padding: "14px 18px 10px 18px",
	background: "#f8fafc",
	boxShadow: "none",
	display: "flex",
	flexDirection: "row",
	gap: 14,
	alignItems: "flex-start",
};
const avatarStyle = {
	width: 32,
	height: 32,
	borderRadius: "50%",
	objectFit: "cover",
	border: "none",
	fontWeight: 700,
	fontSize: 10,
};
const contentStyle = {
	flex: 1,
	minWidth: 0,
};
const metaStyle = {
	fontSize: 13,
	color: "#6b7a90",
	marginBottom: 0,
	display: "flex",
	alignItems: "center",
	gap: 6,
	flexWrap: "wrap",
};
const nameStyle = {
	fontWeight: 500,
	color: "#1976d2",
	cursor: "pointer",
	marginRight: 4,
};
const roleStyle = {
	color: "#a7aeb5ff",
	fontWeight: 500,
	marginRight: 4,
};
const publishedStyle = {
	color: "#6b7a90",
	fontSize: 13,
	marginLeft: 8,
};
const categoryStyle = {
	color: "#1976d2",
	fontWeight: 500,
	marginLeft: 4,
	textDecoration: "underline dotted",
	fontStyle: "italic",
	cursor: "pointer",
};
const titleStyle = {
	fontWeight: 500,
	fontSize: 16,
	opacity: 0.7,
	marginBottom: 0,
	color: "#1a1a1aff",
	lineHeight: 1.2,
	display: "inline-block",
};
const descStyle = {
	color: "#1a1a1aff",
	fontSize: 14,
	margin: "4px 0 0 0",
	lineHeight: 1.4,
	whiteSpace: "normal",
	textOverflow: "unset",
	overflow: "visible",
};
const statsStyle = {
	display: "flex",
	gap: 16,
	fontSize: 12,
	color: "#888",
	alignItems: "center",
	marginTop: 6,
	marginBottom: 0,
};
const statIconStyle = {
	marginRight: 3,
	fontSize: 16,
	color: "#bbb",
};
const imageStyle = {
	width: 140,
	height: 90,
	objectFit: "cover",
	borderRadius: 8,
	border: "1.5px solid #e0e4ea",
};
const dividerStyle = {
	height: 1,
	background: "#e0e4ea",
	margin: "0 0 0 62px",
	border: "none",
};
const statItemStyle = {
	display: "flex",
	alignItems: "center",
	gap: 4,
	color: "#999",
	fontSize: 12,
	fontWeight: 400,
};

// Additional styles for new components
const loadingContainerStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "60px 20px",
	minHeight: 200,
};

const filterToggleStyle = {
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
};

const checkboxStyle = {
	display: "inline-block",
	width: 18,
	height: 18,
	background: "#fff",
	border: "1.5px solid #bfc8d6",
	borderRadius: 4,
	marginRight: 4,
	boxSizing: "border-box",
	position: "relative",
};

const checkboxCheckedStyle = {
	background: "#3b82f6",
};

const showMoreButtonStyle = {
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
};

// SVG ICONS
const LikeIcon = ({ style }) => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		style={style}
		role='presentation'
	>
		<path
			d='M6.5 14.5V6.5L10.5 2.5C10.7761 2.22386 11.2239 2.22386 11.5 2.5C11.7761 2.77614 11.7761 3.22386 11.5 3.5L8.5 6.5H13C13.5523 6.5 14 6.94772 14 7.5V13C14 13.5523 13.5523 14 13 14H7C6.72386 14 6.5 14.2239 6.5 14.5Z'
			fill='currentColor'
		/>
		<rect x='2' y='7' width='3' height='7' rx='1' fill='currentColor' />
	</svg>
);
const EyeIcon = ({ style }) => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 20 20'
		style={style}
		role='presentation'
	>
		<path
			d='M10.0002 3.75C5.8335 3.75 2.27516 6.34167 0.833496 10C2.27516 13.6583 5.8335 16.25 10.0002 16.25C14.1668 16.25 17.7252 13.6583 19.1668 10C17.7252 6.34167 14.1668 3.75 10.0002 3.75ZM10.0002 14.1667C7.70016 14.1667 5.8335 12.3 5.8335 10C5.8335 7.7 7.70016 5.83333 10.0002 5.83333C12.3002 5.83333 14.1668 7.7 14.1668 10C14.1668 12.3 12.3002 14.1667 10.0002 14.1667ZM10.0002 7.5C8.61683 7.5 7.50016 8.61667 7.50016 10C7.50016 11.3833 8.61683 12.5 10.0002 12.5C11.3835 12.5 12.5002 11.3833 12.5002 10C12.5002 8.61667 11.3835 7.5 10.0002 7.5Z'
			fill='currentColor'
		></path>
	</svg>
);
const CommentIcon = ({ style }) => (
	<svg
		width='14'
		height='14'
		viewBox='0 0 12 13'
		style={style}
		role='presentation'
	>
		<path
			d='M10.8 0.5H1.2C0.54 0.5 0 1.04 0 1.7V12.5L2.4 10.1H10.8C11.46 10.1 12 9.56 12 8.9V1.7C12 1.04 11.46 0.5 10.8 0.5Z'
			fill='currentColor'
		></path>
	</svg>
);

const TAB_RECENT = "recent";
const TAB_BEST_ANSWER = "bestAnswer";

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

const fetchTopics = async (filter = {}, page = 1) => {
	// Dummy data as fallback
	const dummyResponse = {
		topics: [
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/company-announcements-3",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/company-announcements-3/lorem-ipsum-is-bugger-off-95",
				},
				id: "19",
				publicId: "95",
				title: "lorem ipsum is bugger off",
				content: "<p>lorem ipsum is bugger off</p>",
				categoryName: "Company announcements",
				categoryId: "3",
				contentType: "question",
				featuredImage: "",
				likes: 0,
				views: 1,
				votes: 0,
				replyCount: 0,
				publishedAt: "2025-07-04T03:58:21+00:00",
				lastActivityAt: "2025-07-04T03:58:21+00:00",
				lastContributor: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				lastPostId: 0,
				author: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "4 hours ago",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/product-q-a-6",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/product-q-a-6/ceintegration-community-and-this-is-not-a-spam-90",
				},
				id: "13",
				publicId: "90",
				title: "ceintegration community and this is not a spam",
				content:
					"<p>ceintegration community and this is not a spam</p>",
				categoryName: "Product Q&A",
				categoryId: "6",
				contentType: "conversation",
				featuredImage: "",
				likes: 0,
				views: 1,
				votes: 0,
				replyCount: 0,
				publishedAt: "2025-07-01T12:59:49+00:00",
				lastActivityAt: "2025-07-01T12:59:49+00:00",
				lastContributor: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				lastPostId: 0,
				author: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "2 days ago",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2/coming-from-inside-ceintegration-never-mind-2-89",
				},
				id: "15",
				publicId: "89",
				title: "coming from inside ceintegration, never mind 2",
				content:
					'<div><div class="topic-view-content-wrapper"><div class="post__content qa-topic-post-content post__content--new-editor post__content post__content--new-editor"><p>coming from inside ceintegration, never mind</p></div></div></div>',
				categoryName: "Getting started in the community",
				categoryId: "2",
				contentType: "question",
				featuredImage: "",
				likes: 0,
				views: 10,
				votes: 0,
				replyCount: 7,
				publishedAt: "2025-06-30T06:25:20+00:00",
				lastActivityAt: "2025-06-30T12:43:25+00:00",
				lastContributor: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				lastPostId: 27,
				author: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "3 days ago",
				lastReplyPublicId: "170",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2/coming-from-inside-ceintegration-never-mind-88",
				},
				id: "14",
				publicId: "88",
				title: "coming from inside ceintegration, never mind",
				content: "<p>coming from inside ceintegration, never mind</p>",
				categoryName: "Getting started in the community",
				categoryId: "2",
				contentType: "question",
				featuredImage: "",
				likes: 0,
				views: 2,
				votes: 0,
				replyCount: 0,
				publishedAt: "2025-06-30T06:23:55+00:00",
				lastActivityAt: "2025-06-30T06:23:55+00:00",
				lastContributor: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				lastPostId: 0,
				author: {
					id: "15",
					username: "amadgula",
					avatar: "",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "4 days ago",
			},
			{
				categoryUrl: "https://ceintegration-en-hub.almostinsided.com/-",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/ideas/add-more-filtering-options-to-the-dashboards-78",
				},
				id: "14",
				publicId: "78",
				title: "Add more filtering options to the dashboards",
				content:
					"<p>I'm a big fan of the recent improvements that you have made to the dashboards, it allows me to do in-depth analytics and generate the reports that I use in my QBRs. </p><p>It would be even better if we have more filtering options available such as:</p><ul><li>Company</li>\t<li>Sign up date</li>\t<li>Age</li>\t<li>Account</li></ul><p>Right now I need to get this data elsewhere and combine data sets.What do you guys think?</p>",
				categoryName: "",
				categoryId: "",
				contentType: "idea",
				featuredImage: "",
				likes: 0,
				views: 21,
				votes: 1,
				replyCount: 2,
				publishedAt: "2022-09-12T10:12:49+00:00",
				lastActivityAt: "2025-05-30T06:30:00+00:00",
				lastContributor: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				lastPostId: 42,
				author: {
					id: "3",
					username: "Eliza",
					avatar: "https://uploads-eu-west-1.almostinsided.com/trials-en/icon/200x200/e481abd7-8942-4617-974a-0fa6c9d3a403.png",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "New",
					textColor: "ffffff",
					backgroundColor: "5050d6",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "1 month ago",
				lastReplyPublicId: "159",
			},
			{
				categoryUrl: "https://ceintegration-en-hub.almostinsided.com/-",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/ideas/testing-topic-creation-87",
				},
				id: "15",
				publicId: "87",
				title: "Testing Topic Creation",
				content: "<p>Testing Topic Creation as type idea</p>",
				categoryName: "",
				categoryId: "",
				contentType: "idea",
				featuredImage: "",
				likes: 0,
				views: 1,
				votes: 1,
				replyCount: 0,
				publishedAt: "2025-05-26T13:34:25+00:00",
				lastActivityAt: "2025-05-26T13:34:25+00:00",
				lastContributor: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				lastPostId: 0,
				author: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "New",
					textColor: "ffffff",
					backgroundColor: "5050d6",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: true,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "1 month ago",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/general-q-a-7",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/general-q-a-7/testing-topic-creation-86",
				},
				id: "12",
				publicId: "86",
				title: "Testing topic creation",
				content: "<p>Testing topic creation with type conversation</p>",
				categoryName: "General Q&A",
				categoryId: "7",
				contentType: "conversation",
				featuredImage: "",
				likes: 0,
				views: 10,
				votes: 0,
				replyCount: 0,
				publishedAt: "2025-05-26T13:22:19+00:00",
				lastActivityAt: "2025-05-26T13:22:19+00:00",
				lastContributor: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				lastPostId: 0,
				author: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "1 month ago",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2/question-85",
				},
				id: "11",
				publicId: "85",
				title: "question",
				content: "<p>This is a question. </p>",
				categoryName: "Getting started in the community",
				categoryId: "2",
				contentType: "conversation",
				featuredImage: "",
				likes: 1,
				views: 8,
				votes: 0,
				replyCount: 2,
				publishedAt: "2025-01-27T10:27:45+00:00",
				lastActivityAt: "2025-02-04T05:01:13+00:00",
				lastContributor: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				lastPostId: 3,
				author: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: true,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "5 months ago",
				lastReplyPublicId: "156",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/amsterdam-27",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/amsterdam-27/meet-greet-sessions-37",
				},
				id: "6",
				publicId: "37",
				title: "Meet & Greet sessions?",
				content:
					"<p>I'm wondering if there are any meet &amp; greet sessions here in Amsterdam, who can tell me more?</p>",
				categoryName: "Amsterdam",
				categoryId: "27",
				contentType: "question",
				featuredImage: "",
				likes: 1,
				views: 16,
				votes: 0,
				replyCount: 3,
				publishedAt: "2024-10-04T08:56:46+00:00",
				lastActivityAt: "2025-01-27T10:26:32+00:00",
				lastContributor: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				lastPostId: 18,
				author: {
					id: "5",
					username: "Jenny",
					avatar: "https://uploads-eu-west-1.almostinsided.com/trials-en/icon/90x90/b3828e2f-d57c-4cd8-81a5-7d35df1d994d.png",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: true,
				likedOrVotedByCurrentUser: true,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "5 months ago",
				lastReplyPublicId: "153",
			},
			{
				categoryUrl:
					"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2",
				topicUrl: {
					destination:
						"https://ceintegration-en-hub.almostinsided.com/getting-started-in-the-community-2/topic-84",
				},
				id: "13",
				publicId: "84",
				title: "Topic",
				content: "<p>This is toic</p>",
				categoryName: "Getting started in the community",
				categoryId: "2",
				contentType: "question",
				featuredImage: "",
				likes: 0,
				views: 2,
				votes: 0,
				replyCount: 0,
				publishedAt: "2025-01-23T10:33:22+00:00",
				lastActivityAt: "2025-01-23T10:33:22+00:00",
				lastContributor: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				lastPostId: 0,
				author: {
					id: "9",
					username: "Customer Communities Admin",
					avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				},
				sticky: false,
				publicLabel: "",
				ideaStatus: {
					name: "",
					textColor: "",
					backgroundColor: "",
				},
				hasBestAnswer: false,
				likedOrVotedByCurrentUser: false,
				unreadRepliesCount: 0,
				isUnreadPostCountEnabled: false,
				isNew: false,
				lastActivityAtRelative: "5 months ago",
			},
		],
		total: 39,
		authors: {
			3: {
				id: 3,
				url: "/members/eliza-3",
				name: "Eliza",
				avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/e481abd7-8942-4617-974a-0fa6c9d3a403.png",
				userTitle: "New Participant",
				userLevel: 0,
				badges: [
					{
						url: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/attachment/1058568c-d790-4174-8611-a0ab9318084c_thumb.png",
						title: "Innovator",
					},
					{
						url: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/attachment/8ab75a78-c247-464d-ae3e-2b6bff6968f9_thumb.png",
						title: "Expert",
					},
					{
						url: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/attachment/dae1ea50-6e5b-4790-9dd7-45f7c57fa8d7_thumb.png",
						title: "Easy talker",
					},
				],
				isBanned: false,
				rank: {
					avatarIcon: null,
					avatarIconUrl: null,
					isBold: false,
					isItalic: false,
					isUnderline: false,
					icon: null,
					iconUrl: null,
					name: "New Participant",
					color: "",
				},
				postCount: 3,
			},
			5: {
				id: 5,
				url: "/members/jenny-5",
				name: "Jenny",
				avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/90x90/b3828e2f-d57c-4cd8-81a5-7d35df1d994d.png",
				userTitle: "New Participant",
				userLevel: 0,
				badges: [
					{
						url: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/attachment/1058568c-d790-4174-8611-a0ab9318084c_thumb.png",
						title: "Innovator",
					},
				],
				isBanned: false,
				rank: {
					avatarIcon: null,
					avatarIconUrl: null,
					isBold: false,
					isItalic: false,
					isUnderline: false,
					icon: null,
					iconUrl: null,
					name: "New Participant",
					color: "",
				},
				postCount: 0,
			},
			9: {
				id: 9,
				url: "/members/customer-communities-admin-9",
				name: "Customer Communities Admin",
				avatar: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/icon/200x200/54b4078e-b95b-4048-8082-b6a24bc7ebf6.png",
				userTitle: "Inspiring",
				userLevel: 0,
				badges: [
					{
						url: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/attachment/1058568c-d790-4174-8611-a0ab9318084c_thumb.png",
						title: "Innovator",
					},
				],
				isBanned: false,
				rank: {
					avatarIcon: null,
					avatarIconUrl: null,
					isBold: false,
					isItalic: false,
					isUnderline: false,
					icon: null,
					iconUrl: null,
					name: "Inspiring",
					color: "",
				},
				postCount: 8,
			},
			15: {
				id: 15,
				url: "/members/amadgula-15",
				name: "amadgula",
				avatar: "",
				userTitle: "Participating Frequently",
				userLevel: 0,
				badges: [
					{
						url: "https://uploads-eu-west-1.almostinsided.com/ceintegration-en/attachment/37324b9d-c21a-4b33-b268-e05ffdc37f32_thumb.png",
						title: "Product expert",
					},
				],
				isBanned: false,
				rank: {
					avatarIcon: null,
					avatarIconUrl: null,
					isBold: false,
					isItalic: false,
					isUnderline: false,
					icon: null,
					iconUrl: null,
					name: "Participating Frequently",
					color: "",
				},
				postCount: 7,
			},
		},
	};

	try {
		const pageSize = PAGE_SIZE;
		const res = await fetch(
			"https://communities.gainsight.com/contentNavigation/topics",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": "dummy",
					"x-requested-with": "XMLHttpRequest",
				},
				body: JSON.stringify({
					sort: { lastActivityAt: "desc" },
					pagination: { page, pageSize },
					filters: { category: null, ...filter },
				}),
			}
		);

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

		// If API call fails, use dummy data
		console.log("API call failed, using dummy data");
		return processTopicsData(dummyResponse);
	} catch (error) {
		// If any error occurs (CORS, network, etc.), use dummy data
		console.log(
			"Error fetching from API, using dummy data:",
			error.message
		);
		return processTopicsData(dummyResponse);
	}
};

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
// REUSABLE COMPONENTS
// ============================================================================

const Avatar = ({ author, size = 32, style = {} }) => {
	const baseAvatarStyle =
		size === 32
			? avatarStyle
			: {
					width: 22,
					height: 22,
					borderRadius: "50%",
					objectFit: "cover",
					marginRight: 2,
			  };
	const fallbackStyle =
		size === 32
			? {
					...avatarStyle,
					background: "#a3d8f4",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 12,
					fontWeight: 700,
					color: "#fff",
			  }
			: {
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
			  };

	if (author.avatarUrl) {
		return (
			<img
				src={author.avatarUrl}
				alt={author.name || ""}
				style={{ ...baseAvatarStyle, ...style }}
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
			<Icon style={statIconStyle} />
			<span style={{ marginLeft: 4 }}>{value}</span>
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				style={{ textDecoration: "none", color: "#999", ...style }}
			>
				{content}
			</a>
		);
	}

	return <span style={{ ...statItemStyle, ...style }}>{content}</span>;
};

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

const CheckmarkIcon = () => (
	<svg
		width='14'
		height='14'
		viewBox='0 0 14 14'
		style={{ position: "absolute", top: 1, left: 1 }}
	>
		<polyline
			points='2,7 6,11 12,3'
			style={{
				fill: "none",
				stroke: "#fff",
				strokeWidth: 2,
			}}
		/>
	</svg>
);

const FilterToggle = ({ hasBestAnswer, onToggle }) => (
	<div style={filterToggleStyle} onClick={onToggle}>
		<span
			style={{
				...checkboxStyle,
				...(hasBestAnswer && checkboxCheckedStyle),
			}}
		>
			{hasBestAnswer && <CheckmarkIcon />}
		</span>
		Has best answer
	</div>
);

const TopicCard = ({ topic, isLast }) => {
	const { author, stats, topicUrl } = topic;
	const hasLink = topicUrl?.destination;

	return (
		<>
			<div style={cardStyle}>
				<Avatar author={author} />

				<div
					style={{
						...contentStyle,
						textAlign: "left",
						paddingLeft: 8,
					}}
				>
					{/* Meta information */}
					<div style={metaStyle}>
						{author.url ? (
							<a
								href={author.url}
								target='_blank'
								rel='noopener noreferrer'
								style={nameStyle}
							>
								{author.name || author.username || ""}
							</a>
						) : (
							<span style={nameStyle}>
								{author.name || author.username || ""}
							</span>
						)}

						{author.role && (
							<span style={roleStyle}>{author.role}</span>
						)}

						<span
							style={{
								color: "#888",
								fontStyle: "italic",
								marginRight: 4,
							}}
						>
							{getContentTypeLabel(topic.contentType)}
						</span>

						{topic.category && topic.categoryUrl ? (
							<a
								href={topic.categoryUrl}
								target='_blank'
								rel='noopener noreferrer'
								style={categoryStyle}
							>
								{topic.category}
							</a>
						) : (
							topic.category && (
								<span style={categoryStyle}>
									{topic.category}
								</span>
							)
						)}
					</div>

					{/* Title */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 6,
							marginBottom: 2,
							marginTop: 10,
						}}
					>
						{hasLink ? (
							<a
								href={topicUrl.destination}
								target='_blank'
								rel='noopener noreferrer'
								style={titleStyle}
							>
								{topic.title}
							</a>
						) : (
							<div style={titleStyle}>{topic.title}</div>
						)}

						{topic.contentType === "question" && (
							<span
								style={{
									color: "#f5b400",
									fontSize: 12,
									marginLeft: 2,
									verticalAlign: "middle",
								}}
							>
								❓
							</span>
						)}
					</div>

					{/* Description */}
					{hasLink ? (
						<a
							href={topicUrl.destination}
							target='_blank'
							rel='noopener noreferrer'
							style={{
								...descStyle,
								textDecoration: "none",
								paddingTop: 8,
							}}
						>
							{stripHtmlTags(topic.description)}
						</a>
					) : (
						<div style={descStyle}>
							{stripHtmlTags(topic.description)}
						</div>
					)}

					{/* Stats */}
					<div
						style={{
							...statsStyle,
							marginTop: 12,
							marginBottom: 0,
							justifyContent: "flex-start",
						}}
					>
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

						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 6,
								marginLeft: 12,
							}}
						>
							<Avatar author={author} size={22} />
							{topic.publishedAt}
						</div>
					</div>
				</div>

				{topic.imageUrl && (
					<img src={topic.imageUrl} alt='topic' style={imageStyle} />
				)}
			</div>

			{!isLast && <hr style={dividerStyle} />}
		</>
	);
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
		<div
			style={{
				maxWidth: 800,
				minHeight: 500,
				width: "100%",
				margin: "0",
				padding: 0,
				background: "#f8fafc",
				borderRadius: 12,
				boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
			}}
		>
			{/* Tab bar with filter */}
			<div style={tabBarStyle}>
				<button style={activeTabStyle}>Recently active</button>
				<FilterToggle
					hasBestAnswer={hasBestAnswer}
					onToggle={handleFilterToggle}
				/>
			</div>

			{/* Initial loading state */}
			{isLoadingInitial ? (
				<div style={loadingContainerStyle}>
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
								style={showMoreButtonStyle}
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

export default TopicContent;
