import React from 'react';
import { ethers } from 'ethers';
import type { DecodedMessage } from '@xmtp/react-sdk';

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

export interface ProfileDetailsType {
	address: string;
	domains?: IDomain[];
	socials?: ISocials[];
}

export interface IDomain {
	dappName: string;
	name: string | null;
	avatar?: string | null;
	resolvedAddress: string;
}

export interface ISocials {
	dappName: string;
	name: string | null;
	avatar?: string | null;
	ownedBy: string;
}

export interface CustomDecodedMessage {
	id: string;
	content: any;
	sent: Date;
	senderAddress: string;
	isSent?: boolean;
}
