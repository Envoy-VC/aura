import React from 'react';
import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='Aura'
			description='Aura bridges the gap between decentralized communication and user-friendly design. Experience the convenience of sending messages to ENS domains, accessing Lens profiles, and enjoying a sleek UI that adapts to your needs.'
			openGraph={{
				url: 'https://aura-chat.vercel.app',
				title: 'Aura',
				description:
					'Aura bridges the gap between decentralized communication and user-friendly design. Experience the convenience of sending messages to ENS domains, accessing Lens profiles, and enjoying a sleek UI that adapts to your needs.',
				images: [
					{
						url: 'https://ipfs.io/ipfs/QmZQyHCsCHcqq1ZPRngrMsyaszWrVxGoM4kdKWnzusnHjb',
						width: 1200,
						height: 630,
						alt: 'Aura OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Aura',
			}}
			twitter={{
				handle: '@Envoy_1084',
				site: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
