import React from 'react';
import { Input, Button } from 'antd';

import { PiMagnifyingGlassDuotone, PiPlusCircleDuotone } from 'react-icons/pi';

const ChatList = () => {
	return (
		<div className='h-screen border-r-2 border-[#F6F6F6] hidden md:flex flex-col justify-start items-center p-4 gap-6 w-full sm:w-[300px]'>
			<div className='flex flex-row items-center justify-between w-full mx-4 mt-6 text-2xl font-semibold text-black'>
				<p>Chats</p>
				<Button type='ghost' size='middle' className='p-[0px] animate-none'>
					<PiPlusCircleDuotone color='#666666' size={32} />
				</Button>
			</div>
			<div className='w-full'>
				<Input
					placeholder='Search'
					bordered={false}
					className='bg-[#F8F8F8] outline-none focus:outline-none hover:bg-[#F8F8F8] p-2 px-4 rounded-md'
					prefix={
						<PiMagnifyingGlassDuotone
							color='#666666'
							size={24}
							className='mr-2'
						/>
					}
				/>
			</div>
		</div>
	);
};

export default ChatList;
