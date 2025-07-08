import React from "react";

const connectCards = [
	{
		title: "Behance",
		description: "Discover and showcase in the largest creative network.",
		imageUrl:
			"https://community.adobe.com/html/@F70DD1390E7D18DD09A79EB1FE272C41/assets/Behance.jpg",
		iconUrl:
			"https://community.adobe.com/html/@E6DD19FC269228F2C9DC9B0E6B281255/assets/behanceicon.svg",
		outlinkIcon:
			"https://community.adobe.com/html/@777897A623C112E388DCA44DD1623F58/assets/S2_White-outlink-icon.svg",
		link: "https://www.behance.net/",
		credits: "Art by behance.net/mathiesonm",
		bgClass: "more-places-to-connect__card--behance",
	},
	{
		title: "Lightroom Discover",
		description:
			"A community dedicated to learning and sharing the art of photography.",
		imageUrl:
			"https://community.adobe.com/html/@A3ACD98AE4577BDC2E9D36EACDD69ED2/assets/Lightroom.jpg",
		iconUrl:
			"https://community.adobe.com/html/@E5CE9B785BF54DB5CD89AC397AC902BC/assets/lightroomicon.svg",
		outlinkIcon:
			"https://community.adobe.com/html/@7DC9EE4D36645EC6182A2A69C44A7E45/assets/S2_Black-outlink-icon.svg",
		link: "https://lightroom.adobe.com/learn/discover",
		credits: "Photography by lightroom.adobe.com/u/asierbayn",
		bgClass: "more-places-to-connect__card--lightroom",
	},
	{
		title: "Adobe Live",
		description: "Be inspired by top creatives and showcase your work.",
		imageUrl:
			"https://community.adobe.com/html/@E87F4589DE3AAF6C7CA3E80BCA3B9B2E/assets/AdobeLive.jpg",
		iconUrl:
			"https://community.adobe.com/html/@1AD48572624D5E4B3AC54A6269DA2B5F/assets/adobeicon.svg",
		outlinkIcon:
			"https://community.adobe.com/html/@777897A623C112E388DCA44DD1623F58/assets/S2_White-outlink-icon.svg",
		link: "https://www.behance.net/live",
		credits: "Stream by behance.net/paultrani/livestreams",
		bgClass: "more-places-to-connect__card--adobelive",
	},
];

const MorePlacesToConnect: React.FC = () => {
	const handleCardClick = (url: string) => {
		window.open(url, "_blank");
	};
	const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
		if (e.key === "Enter") {
			window.open(url, "_blank");
		}
	};

	return (
		<section className='more-places-to-connect'>
			<h2 className='more-places-to-connect__title'>
				More places to connect
			</h2>
			<div className='more-places-to-connect__cards'>
				{connectCards.map((card) => (
					<div
						key={card.title}
						tabIndex={0}
						role='link'
						className={`card creative-card more-places-to-connect__card ${
							card.bgClass
						} ${
							card.title === "Behance" ||
							card.title === "Adobe Live"
								? "more-places-to-connect__card--white-text"
								: ""
						}`}
						onClick={() => handleCardClick(card.link)}
						onKeyDown={(e) => handleCardKeyDown(e, card.link)}
						aria-label={`${card.title}: ${card.description}`}
					>
						<div className='card-body-wraper'>
							<div className='card-header'>
								<img
									className='product-icon'
									src={card.iconUrl}
									loading='lazy'
									alt='icon'
									style={{
										width: 28,
										height: 28,
										marginRight: 8,
									}}
								/>
								<span className='card-title'>{card.title}</span>
								<img
									className='card-anchor'
									src={card.outlinkIcon}
									loading='lazy'
									alt='learn-resources'
								/>
							</div>
							<span className='card-info'>
								{card.description}
							</span>
							<span className='card-credits-text'>
								{card.credits}
							</span>
						</div>
						<img
							className='card-foreground-svg'
							src={card.imageUrl}
							alt={`${card.title} illustration`}
							loading='lazy'
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default MorePlacesToConnect;
