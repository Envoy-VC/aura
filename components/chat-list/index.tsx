import React from 'react';
import { Input, Button } from 'antd';
import ChatCard from '../chat-card';

import { PiMagnifyingGlassDuotone, PiPlusCircleDuotone } from 'react-icons/pi';

const ChatList = () => {
	return (
		<div className='h-screen border-r-2 border-[#F6F6F6] flex flex-col justify-start items-center py-4 px-1 gap-6 w-full md:w-[300px] lg:w-[400px]'>
			<div className='flex flex-row items-center justify-between w-full px-4 mx-4 mt-6 text-2xl font-semibold text-black'>
				<p>Chats</p>
				<Button type='ghost' size='middle' className='p-[0px] animate-none'>
					<PiPlusCircleDuotone color='#666666' size={32} />
				</Button>
			</div>
			<div className='w-full px-2'>
				<Input
					placeholder='Search'
					bordered={false}
					className='bg-[#F8F8F8] outline-none focus:outline-none hover:bg-[#F8F8F8] p-2 rounded-md'
					prefix={
						<PiMagnifyingGlassDuotone
							color='#666666'
							size={24}
							className='mr-2'
						/>
					}
				/>
			</div>
			<div className='flex flex-col w-full gap-[1px] overflow-y-scroll scrollbar-hide'>
				{Array(80)
					.fill(1)
					.map((_, i) => (
						<ChatCard key={i} />
					))}
			</div>
		</div>
	);
};

export default ChatList;
