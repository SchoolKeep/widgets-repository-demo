import React from "react";

const cards = [
	{
		title: "Learn",
		description:
			"Learn with step-by-step video tutorials and hands-on guidance right in the app.",
		imageUrl:
			"https://community.adobe.com/html/@B1136CDC103EB55F9E96EDBD870F5450/assets/Learn-img.svg",
		link: "https://creativecloud.adobe.com/cc/learn",
		outlinkIcon:
			"https://community.adobe.com/html/@7DC9EE4D36645EC6182A2A69C44A7E45/assets/S2_Black-outlink-icon.svg",
		bgColor: "#FDBEFC",
	},
	{
		title: "Help & Support",
		description:
			"Get help managing your account and using apps with how-tos and troubleshooting.",
		imageUrl:
			"https://community.adobe.com/html/@DE7B160A199DE9E93CEEDCAC76D891F7/assets/Help-icon.svg",
		link: "https://helpx.adobe.com/support.html",
		outlinkIcon:
			"https://community.adobe.com/html/@7DC9EE4D36645EC6182A2A69C44A7E45/assets/S2_Black-outlink-icon.svg",
		bgColor: "#A4ECF7",
	},
	{
		title: "Discover",
		description:
			"Stay on top of creative trends with how-tos and giveaways.",
		imageUrl:
			"https://community.adobe.com/html/@272798121AE120060662E23E558976FC/assets/Discover-icon.svg",
		link: "https://creativecloud.adobe.com/cc/discover",
		outlinkIcon:
			"https://community.adobe.com/html/@7DC9EE4D36645EC6182A2A69C44A7E45/assets/S2_Black-outlink-icon.svg",
		bgColor: "#B8EE92",
	},
];

const LearnWithAdobe: React.FC = () => {
	const handleCardClick = (url: string) => {
		window.open(url, "_blank");
	};
	const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
		if (e.key === "Enter") {
			window.open(url, "_blank");
		}
	};

	return (
		<section className='learn-with-adobe'>
			<h2 className='learn-with-adobe__title'>Learn with Adobe</h2>
			<div className='learn-with-adobe__cards'>
				<div
					tabIndex={0}
					role='link'
					className='card creative-card learn-with-adobe__card learn-with-adobe__card--pink'
					onClick={() => handleCardClick(cards[0].link || "")}
					onKeyDown={(e) => handleCardKeyDown(e, cards[0].link || "")}
					aria-label='Learn: Learn with step-by-step video tutorials and hands-on guidance right in the app.'
				>
					<div className='card-body-wraper'>
						<div className='card-header'>
							<span className='card-title'>{cards[0].title}</span>
							<img
								className='card-anchor'
								src={cards[0].outlinkIcon}
								loading='lazy'
								alt='learn-resources'
							/>
						</div>
						<span className='card-info'>
							{cards[0].description}
						</span>
					</div>
					<img
						className='card-foreground-svg'
						src={cards[0].imageUrl}
						alt='Learn illustration'
						loading='lazy'
					/>
				</div>
				<div
					tabIndex={0}
					role='link'
					className='card creative-card learn-with-adobe__card learn-with-adobe__card--blue'
					onClick={() => handleCardClick(cards[1].link || "")}
					onKeyDown={(e) => handleCardKeyDown(e, cards[1].link || "")}
					aria-label='Help & Support: Get help managing your account and using apps with how-tos and troubleshooting.'
				>
					<div className='card-body-wraper'>
						<div className='card-header'>
							<span className='card-title'>{cards[1].title}</span>
							<img
								className='card-anchor'
								src={cards[1].outlinkIcon}
								loading='lazy'
								alt='learn-resources'
							/>
						</div>
						<span className='card-info'>
							{cards[1].description}
						</span>
					</div>
					<img
						className='card-foreground-svg'
						src={cards[1].imageUrl}
						alt='Help & Support illustration'
						loading='lazy'
					/>
				</div>
				<div
					tabIndex={0}
					role='link'
					className='card creative-card learn-with-adobe__card learn-with-adobe__card--green'
					onClick={() => handleCardClick(cards[2].link || "")}
					onKeyDown={(e) => handleCardKeyDown(e, cards[2].link || "")}
					aria-label='Discover: Stay on top of creative trends with how-tos and giveaways.'
				>
					<div className='card-body-wraper'>
						<div className='card-header'>
							<span className='card-title'>{cards[2].title}</span>
							<img
								className='card-anchor'
								src={cards[2].outlinkIcon}
								loading='lazy'
								alt='learn-resources'
							/>
						</div>
						<span className='card-info'>
							{cards[2].description}
						</span>
					</div>
					<img
						className='card-foreground-svg'
						src={cards[2].imageUrl}
						alt='Discover illustration'
						loading='lazy'
					/>
				</div>
			</div>
		</section>
	);
};

export default LearnWithAdobe;
