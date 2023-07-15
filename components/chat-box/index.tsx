import React from 'react';
import { Input, Button } from 'antd';

import ChatButtons from '../chat-buttons';

import { PiTranslateDuotone, PiArrowRightBold } from 'react-icons/pi';

const ChatBox = () => {
	return (
		<div className='flex flex-row gap-2 w-full items-center border-t-2 border-[#F2F2F2] p-4 pt-6'>
			<ChatButtons />
			<div className='w-full'>
				<Input
					placeholder='Write Something...'
					bordered={false}
					className='bg-[#F8F8F8] outline-none focus:outline-none hover:bg-[#F8F8F8] p-2 py-[12px] rounded-md text-[1rem] focus:bg-[#F8F8F8] items-center'
					suffix={
						<PiTranslateDuotone color='#666666' size={24} className='mr-2' />
					}
				/>
			</div>
			<Button
				type='primary'
				className=' bg-[#2176FF] w-fit !py-6 flex items-center flex-row-reverse font-medium'
				size='large'
				icon={<PiArrowRightBold color='#fff' size={24} className='ml-2' />}
			>
				Send
			</Button>
		</div>
	);
};

export default ChatBox;
