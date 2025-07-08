import React from "react";

const discoverCards = [
	{
		title: "Photoshop ecosystem",
		link: "/t5/photoshop-ecosystem/ct-p/ct-photoshop",
		icon: "https://community.adobe.com/html/@1D58260C96692A32775D6CE5FCCEE49C/assets/icons/photoshop.svg",
		count: "126.9K conversations",
	},
	{
		title: "Acrobat",
		link: "/t5/acrobat/ct-p/ct-acrobat",
		icon: "https://community.adobe.com/html/@BF497F760DA3BAC3F8039ED548C3B448/assets/icons/acrobat-reader.svg",
		count: "85.0K conversations",
	},
	{
		title: "Adobe Firefly",
		link: "https://community2.adobe.com/hb/adobe-firefly?profile.language=en",
		icon: "https://community.adobe.com/html/@02C7929CE984F070C87B75DE941E3E0B/assets/icons/adobe-firefly.svg",
		count: "8.0K conversations",
	},
	{
		title: "Adobe Express",
		link: "/t5/adobe-express/ct-p/ct-adobe-express",
		icon: "https://community.adobe.com/html/@D32ACEA1FCC72EDB4FBC85A6AB6748E1/assets/icons/adobe-express.svg",
		count: "14.6K conversations",
	},
	{
		title: "Adobe Events",
		link: "/t5/adobe-events/ct-p/ct-adobe-events",
		icon: "https://community.adobe.com/html/@5191A445398014F26F24B9C1A088DF6D/assets/icons/creative-cloud.svg",
		count: "2 conversations",
	},
	{
		title: "Premiere Pro",
		link: "/t5/premiere-pro/ct-p/ct-premiere-pro",
		icon: "https://community.adobe.com/html/@E441B8333A938FE9FF2FE7C117078AE1/assets/icons/premiere-pro.svg",
		count: "97.1K conversations",
	},
	{
		title: "Illustrator",
		link: "/t5/illustrator/ct-p/ct-illustrator",
		icon: "https://community.adobe.com/html/@CFC7EAFFBF2C4479EC603993CDF62CD0/assets/icons/illustrator.svg",
		count: "62.8K conversations",
	},
	{
		title: "After Effects",
		link: "/t5/after-effects/ct-p/ct-after-effects",
		icon: "https://community.adobe.com/html/@940D54FF19919DDFC241A0BAA4E03A8E/assets/icons/after-effects.svg",
		count: "52.8K conversations",
	},
	{
		title: "InDesign",
		link: "/t5/indesign/ct-p/ct-indesign",
		icon: "https://community.adobe.com/html/@F054039F2240A0E71BF63DF0EE981D2F/assets/icons/indesign.svg",
		count: "73.7K conversations",
	},
	{
		title: "Photoshop (Beta)",
		link: "/t5/photoshop-beta/ct-p/ct-photoshop-beta",
		icon: "https://community.adobe.com/html/@72249AE883825C4A103DA552FDD47E68/assets/icons/photoshop-beta.svg",
		count: "3.8K conversations",
	},
	{
		title: "Lightroom ecosystem (Cloud-based)",
		link: "/t5/lightroom-ecosystem-cloud-based/ct-p/ct-lightroom",
		icon: "https://community.adobe.com/html/@2877241F8D3AB8E3AA064B84F29DE67C/assets/icons/lightroom.svg",
		count: "25.5K conversations",
	},
	{
		title: "Lightroom Classic",
		link: "/t5/lightroom-classic/ct-p/ct-lightroom-classic",
		icon: "https://community.adobe.com/html/@125E8AA0F308457B797F162334FA66C4/assets/icons/lightroom-classic.svg",
		count: "62.4K conversations",
	},
	{
		title: "Audition",
		link: "/t5/audition/ct-p/ct-audition",
		icon: "https://community.adobe.com/html/@AA235C416CDD12DD75D012CF71EE329C/assets/icons/audition.svg",
		count: "9.5K conversations",
	},
	{
		title: "Animate",
		link: "/t5/animate/ct-p/ct-animate",
		icon: "https://community.adobe.com/html/@6BE11BA41F1F3AD6E353BA82895D1A10/assets/icons/animate.svg",
		count: "68.8K conversations",
	},
	{
		title: "Fresco",
		link: "/t5/fresco/ct-p/ct-Fresco",
		icon: "https://community.adobe.com/html/@954734732E3AAF666AD84552E7317E3D/assets/icons/fresco.svg",
		count: "3.1K conversations",
	},
	{
		title: "Stock",
		link: "/t5/stock/ct-p/ct-stock",
		icon: "https://community.adobe.com/html/@B136C283E49380304275BA354A1DA36F/assets/icons/stock.svg",
		count: "7.9K conversations",
	},
];

const MoreToDiscover: React.FC = () => {
	const handleCardClick = (url: string) => {
		window.open(url, "_blank");
	};
	const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
		if (e.key === "Enter") {
			window.open(url, "_blank");
		}
	};

	return (
		<section className='more-to-discover'>
			<h2 className='more-to-discover__title'>More to discover</h2>
			<div className='more-to-discover__cards'>
				{discoverCards.map((card) => (
					<div
						key={card.title}
						tabIndex={0}
						role='link'
						className='card more-to-discover__card'
						onClick={() => handleCardClick(card.link)}
						onKeyDown={(e) => handleCardKeyDown(e, card.link)}
						aria-label={`${card.title}: ${card.count}`}
					>
						<div className='more-to-discover__card-row'>
							<div className='more-to-discover__card-icon-col'>
								<img
									className='more-to-discover__card-icon'
									src={card.icon}
									alt={card.title}
									loading='lazy'
									width={40}
									height={40}
								/>
							</div>
							<div className='more-to-discover__card-info-col'>
								<div className='more-to-discover__card-title'>
									{card.title}
								</div>
								<div className='more-to-discover__card-count'>
									<img
										src='https://community.adobe.com/html/@51CA26B342A2D72A7C24DD418AFF6ADD/assets/S2_Icon_conversations-icon.svg'
										alt='conversations'
										className='more-to-discover__card-count-icon'
										loading='lazy'
										width={16}
										height={16}
									/>
									<span className='more-to-discover__card-count-text'>
										{card.count}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default MoreToDiscover;
