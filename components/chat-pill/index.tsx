import React from 'react';
import { Avatar } from 'antd';

import { formatTimestamp } from '@/utils';

import type { IMessage } from '@/types';

interface ChatPillProps extends IMessage {
	isRecentMessage: boolean;
}

const ChatPill = ({
	message,
	sender,
	timestamp,
	isRecentMessage,
}: ChatPillProps) => {
	return (
		<div
			className={`flex gap-4 ${
				sender === 'me' ? 'self-end flex-row-reverse' : 'self-start flex-row'
			}`}
		>
			<div className={`items-start ${isRecentMessage ? 'hidden' : 'flex'}`}>
				<Avatar
					size={{ xs: 36, sm: 36, md: 40, lg: 42, xl: 42, xxl: 42 }}
					src='https://ipfs.io/ipfs/QmZMY6iuh3dQiSVXBbLbMWcZConzVXqoBXjEeFC22LapkN'
					className='bg-[#BFBFBF] border-none'
				/>
			</div>
			<div
				className={`flex flex-col gap-1 ${
					sender === 'me' ? 'items-end' : 'items-start'
				}`}
			>
				<div
					className={`flex-row gap-2 items-center ${
						sender === 'me' ? 'flex-row-reverse' : 'flex-row'
					} ${isRecentMessage ? 'hidden' : 'flex'}`}
				>
					<div className='font-semibold text-[0.7rem] lg:text-[0.9rem]'>
						Ricky Smith
					</div>
					<div className='text-[#A4A8AE] font-medium lg:text-[0.75rem] text-[0.65rem]'>
						{formatTimestamp(timestamp)}
					</div>
				</div>
				<div
					className={`rounded-xl lg:rounded-2xl py-1 lg:py-3 font-medium text-[1rem] px-2 md:px-4 ${
						sender === 'me'
							? '!rounded-tr-none bg-[#2176FF] text-white text-right w-fit'
							: 'rounded-tl-none bg-[#F8F8F8]'
					} ${
						isRecentMessage
							? 'mr-[3.6rem] lg:mr-[3.9rem] !rounded-tr-xl lg:rounded-tr-2xl'
							: ''
					}`}
				>
					{message}
				</div>
			</div>
		</div>
	);
};

export default ChatPill;
