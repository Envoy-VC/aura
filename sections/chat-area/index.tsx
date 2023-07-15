import React from 'react';

import { ChatBox } from '@/components';

const ChatArea = () => {
	return (
		<div className='w-full flex flex-col justify-end items-start h-[100dvh]'>
			<div className='p-4'>chats</div>
			<ChatBox />
		</div>
	);
};

export default ChatArea;
