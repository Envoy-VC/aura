import React from 'react';

import { ChatBox, ChatPill } from '@/components';
import { message } from 'antd';

const ChatArea = () => {
	return (
		<div className='w-full flex flex-col justify-end items-start h-[100dvh]'>
			<div className='p-4 flex flex-col gap-4 overflow-y-scroll w-full scrollbar-hide px-8'>
				{messages.map((message) => (
					<ChatPill key={message.id} {...message} />
				))}
			</div>
			<ChatBox />
		</div>
	);
};

export default ChatArea;

const messages = [
	{
		id: 1,
		message: 'Hello',
		sender: 'me',
	},
	{
		id: 2,
		message: 'Hi',
		sender: 'them',
	},
	{
		id: 3,
		message: 'How are you?',
		sender: 'me',
	},
	{
		id: 4,
		message: 'I am fine',
		sender: 'them',
	},
	{
		id: 5,
		message: 'What about you?',
		sender: 'them',
	},
	{
		id: 6,
		message: 'I am fine too',
		sender: 'me',
	},
	{
		id: 7,
		message: 'How is your day going?',
		sender: 'me',
	},
	{
		id: 8,
		message: 'It is going good',
		sender: 'them',
	},
	{
		id: 9,
		message: 'What about you?',
		sender: 'them',
	},
	{
		id: 10,
		message: 'It is going good',
		sender: 'me',
	},
	{
		id: 1,
		message: 'Hello',
		sender: 'me',
	},
	{
		id: 2,
		message: 'Hi',
		sender: 'them',
	},
	{
		id: 3,
		message: 'How are you?',
		sender: 'me',
	},
	{
		id: 4,
		message: 'I am fine',
		sender: 'them',
	},
	{
		id: 5,
		message: 'What about you?',
		sender: 'them',
	},
	{
		id: 6,
		message: 'I am fine too',
		sender: 'me',
	},
	{
		id: 7,
		message: 'How is your day going?',
		sender: 'me',
	},
	{
		id: 8,
		message: 'It is going good',
		sender: 'them',
	},
	{
		id: 9,
		message: 'What about you?',
		sender: 'them',
	},
	{
		id: 10,
		message: 'It is going good',
		sender: 'me',
	},
];
