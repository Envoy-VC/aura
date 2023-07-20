import React from 'react';
import { Avatar, Button } from 'antd';
import { CustomConnect } from '@/components';
import { ChatContext } from '../layout/nested-layout';
import { SidebarItem } from '@/types';

import {
	PiChatsDuotone,
	PiUsersThreeDuotone,
	PiChatTextDuotone,
	PiBookmarkSimpleDuotone,
} from 'react-icons/pi';
import logo from '@/public/logo.png';

import { ISidebarItem } from '@/types';

const Sidebar: React.FC = () => {
	const { setActiveChat } = React.useContext(ChatContext);
	const [activeTab, setActiveTab] = React.useState<SidebarItem>('chat');

	const SidebarItems: ISidebarItem[] = [
		{
			name: 'Chat',
			icon: (
				<PiChatsDuotone
					color={activeTab === 'chat' ? '#2176FF' : '#666666'}
					size={24}
				/>
			),
		},
		{
			name: 'Groups',
			icon: (
				<PiUsersThreeDuotone
					color={activeTab === 'groups' ? '#2176FF' : '#666666'}
					size={24}
				/>
			),
		},
		{
			name: 'Requests',
			icon: (
				<PiChatTextDuotone
					color={activeTab === 'requests' ? '#2176FF' : '#666666'}
					size={24}
				/>
			),
		},
		{
			name: 'Archived',
			icon: (
				<PiBookmarkSimpleDuotone
					color={activeTab === 'archived' ? '#2176FF' : '#666666'}
					size={24}
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
		<div className='h-screen max-w-[225px] border-r-2 border-[#F6F6F6] p-4 sm:flex flex-col justify-between hidden'>
			<div>
				<div className='w-10 h-10'>
					<Avatar src={logo.src} size={40} className='ml-2' />
				</div>
				<div className='flex flex-col gap-4 mt-12'>
					{SidebarItems.map((item, index) => (
						<Button
							key={index}
							type='link'
							icon={item.icon}
							className={`flex items-center gap-4 text-lg font-medium hover:!text-[#2176FF] w-fit ${
								activeTab === item.name.toLowerCase()
									? 'text-[#2176FF]'
									: 'text-[#8f8f8f]'
							}`}
							onClick={() => handleTabChange(item)}
						>
							<span className='!hidden xl:!flex'>{item.name}</span>
						</Button>
					))}
				</div>
			</div>
			<div className='justify-end mb-4'>
				<CustomConnect isMobile={false} />
			</div>
		</div>
	);
};

export default Sidebar;
