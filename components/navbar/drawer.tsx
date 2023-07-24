import React from 'react';
import { ChatContext } from '../layout/nested-layout';
import { Button } from 'antd';
import { CustomConnect } from '@/components';

import {
	PiChatsDuotone,
	PiUsersThreeDuotone,
	PiChatTextDuotone,
	PiBookmarkSimpleDuotone,
} from 'react-icons/pi';

import type { ISidebarItem, SidebarItem } from '@/types';

const NavbarDrawer = () => {
	const [activeTab, setActiveTab] = React.useState<SidebarItem>('chat');
	const { setActiveChat } = React.useContext(ChatContext);
	const SidebarItems: ISidebarItem[] = [
		{
			name: 'Chat',
			icon: (
				<PiChatsDuotone
					color={activeTab === 'chat' ? '#2176FF' : '#666666'}
					size={22}
				/>
			),
		},
		{
			name: 'Groups',
			icon: (
				<PiUsersThreeDuotone
					color={activeTab === 'groups' ? '#2176FF' : '#666666'}
					size={22}
				/>
			),
		},
		{
			name: 'Requests',
			icon: (
				<PiChatTextDuotone
					color={activeTab === 'requests' ? '#2176FF' : '#666666'}
					size={22}
				/>
			),
		},
		{
			name: 'Archived',
			icon: (
				<PiBookmarkSimpleDuotone
					color={activeTab === 'archived' ? '#2176FF' : '#666666'}
					size={22}
				/>
			),
		},
	];

	const handleTabChange = (item: ISidebarItem) => {
		setActiveTab(item.name.toLowerCase() as any);
		if (item.name.toLowerCase() === 'chat') {
			setActiveChat(null);
		}
	};
	return (
		<div className='flex flex-col gap-3'>
			{SidebarItems.map((item, index) => (
				<Button
					key={index}
					type='link'
					icon={item.icon}
					className={`flex items-center gap-4 text-[1rem] font-medium hover:!text-[#2176FF] w-fit ${
						activeTab === item.name.toLowerCase()
							? 'text-[#2176FF]'
							: 'text-[#8f8f8f]'
					}`}
					onClick={() => handleTabChange(item)}
				>
					<span className='flex'>{item.name}</span>
				</Button>
			))}

			<div className='pt-2 mt-2 border-t-2 border-[#66666]'>
				<CustomConnect isMobile={true} />
			</div>
		</div>
	);
};

export default NavbarDrawer;
