import React from 'react';
import { Avatar, Button } from 'antd';

import {
	PiChatsDuotone,
	PiUsersThreeDuotone,
	PiChatTextDuotone,
	PiBookmarkSimpleDuotone,
	PiSignOutDuotone,
} from 'react-icons/pi';
import logo from '@/public/logo.png';

const Sidebar = () => {
	const [activeTab, setActiveTab] = React.useState('chat');
	const SidebarItems = [
		{
			name: 'chat',
			title: 'Chat',
			icon: (
				<PiChatsDuotone
					color={activeTab === 'chat' ? '#2176FF' : '#666666'}
					size={24}
				/>
			),
		},
		{
			name: 'groups',
			title: 'Groups',
			icon: (
				<PiUsersThreeDuotone
					color={activeTab === 'groups' ? '#2176FF' : '#666666'}
					size={24}
				/>
			),
		},
		{
			name: 'requests',
			title: 'Requests',
			icon: (
				<PiChatTextDuotone
					color={activeTab === 'requests' ? '#2176FF' : '#666666'}
					size={24}
				/>
			),
		},
		{
			name: 'archived',
			title: 'Archived',
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
							type='ghost'
							icon={item.icon}
							className={`flex items-center gap-4 text-lg font-medium !animate-none ${
								activeTab === item.name ? 'text-[#2176FF]' : 'text-[#8f8f8f]'
							}`}
							onClick={() => setActiveTab(item.name)}
						>
							{item.title}
						</Button>
					))}
				</div>
			</div>
			<div className='justify-end'>
				<Button
					type='ghost'
					icon={<PiSignOutDuotone color='#666666' size={24} />}
					className='flex items-center gap-4 text-lg font-medium !animate-none text-[#8f8f8f] flex-row-reverse'
				>
					Vedant
					<Avatar src={logo.src} size={32} className='ml-2' />
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
