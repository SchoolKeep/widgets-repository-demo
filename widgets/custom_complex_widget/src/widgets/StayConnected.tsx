import React from "react";

const socialLinks = [
	{
		name: "YouTube",
		url: "https://www.youtube.com/user/AdobeSystems/Adobe",
		icon: "https://cdn-icons-png.flaticon.com/512/1384/1384028.png",
		label: "Adobe on YouTube",
	},
	{
		name: "TikTok",
		url: "https://www.tiktok.com/@adobe",
		icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tiktok.svg",
		label: "Adobe on TikTok",
	},
	{
		name: "Instagram",
		url: "https://www.instagram.com/adobe/",
		icon: "https://cdn-icons-png.flaticon.com/512/1077/1077042.png",
		label: "Adobe on Instagram",
	},
];

const StayConnected: React.FC = () => (
	<div className='stay-connected__icons'>
		{socialLinks.map((social) => (
			<a
				key={social.name}
				href={social.url}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={social.label}
				className='stay-connected__icon-btn'
			>
				<img
					src={social.icon}
					alt={social.name}
					className='stay-connected__icon-img'
					loading='lazy'
					width={32}
					height={32}
				/>
			</a>
		))}
	</div>
);

export default StayConnected;
