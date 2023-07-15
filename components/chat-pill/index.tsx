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
					size={{ xs: 36, sm: 42, md: 42, lg: 42, xl: 42, xxl: 42 }}
					src='https://ipfs.io/ipfs/QmZMY6iuh3dQiSVXBbLbMWcZConzVXqoBXjEeFC22LapkN'
					className='bg-[#BFBFBF] border-none'
				/>
			</div>
			<div>
				<div
					className={`flex-row gap-2 items-center ${
						sender === 'me' ? 'flex-row-reverse' : 'flex-row'
					} ${isRecentMessage ? 'hidden' : 'flex'}`}
				>
					<div className='font-semibold text-[0.7rem] md:text-[0.9rem]'>
						Ricky Smith
					</div>
					<div className='text-[#A4A8AE] font-medium md:text-[0.75rem] text-[0.65rem]'>
						{formatTimestamp(timestamp)}
					</div>
				</div>
				<div
					className={`rounded-xl md:rounded-2xl py-1 md:py-3 font-medium text-[1rem] px-2 md:px-4 ${
						sender === 'me'
							? '!rounded-tr-none bg-[#2176FF] text-white'
							: 'rounded-tl-none bg-[#F8F8F8]'
					} ${
						isRecentMessage
							? 'mr-[3.6rem] md:mr-[3.9rem] !rounded-tr-xl md:rounded-tr-2xl'
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
