import React from 'react';
import { ethers } from 'ethers';

export type SidebarItem = 'chat' | 'groups' | 'requests' | 'archived';

export interface ISidebarItem {
	name: string;
	icon: React.JSX.Element;
}

export interface IMessage {
	sender: string;
	message: string;
	timestamp: number;
	isRecentMessage: boolean;
}

export interface IENSDetails {
	address: string;
	ensName: string;
	ensAvatar: string;
	resolver: ethers.providers.Resolver | null;
}
