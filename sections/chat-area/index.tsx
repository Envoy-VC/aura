import React from 'react';

import { ChatBox } from '@/components';

const ChatArea = () => {
	return (
		<div className='hidden w-full md:flex flex-col justify-end items-start'>
			<div className='p-4'>chats</div>
			<ChatBox />
		</div>
	);
};

export default ChatArea;
