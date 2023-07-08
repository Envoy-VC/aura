import React from 'react';
import { Avatar, Button } from 'antd';

import { SidebarItem } from '@/types';

import {
	PiChatsDuotone,
	PiUsersThreeDuotone,
	PiChatTextDuotone,
	PiBookmarkSimpleDuotone,
	PiSignOutDuotone,
} from 'react-icons/pi';
import logo from '@/public/logo.png';

import { ISidebarItem } from '@/types';

const Sidebar = () => {
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

	return (
		<div className='w-full h-screen max-w-[225px] border-r-2 border-[#F6F6F6] p-4 flex flex-col justify-between'>
			<div>
				<Avatar src={logo.src} size={40} className='ml-2' />
				<div className='flex flex-col gap-4 mt-12'>
					{SidebarItems.map((item, index) => (
						<Button
							key={index}
							type='link'
							icon={item.icon}
							className={`flex items-center gap-4 text-lg font-medium ${
								activeTab === item.name.toLowerCase()
									? 'text-[#2176FF]'
									: 'text-[#8f8f8f]'
							}`}
							onClick={() => setActiveTab(item.name.toLowerCase() as any)}
						>
							{item.name}
						</Button>
					))}
				</div>
			</div>
			<div className='justify-end'>
				<Button
					type='ghost'
					icon={<PiSignOutDuotone color='#666666' size={24} />}
					className='flex items-center gap-4 text-lg font-medium text-[#8f8f8f] flex-row-reverse'
				>
					Vedant
					<Avatar src={logo.src} size={32} className='ml-2' />
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
