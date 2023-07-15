import React from 'react';

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
