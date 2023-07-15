import React from 'react';
import { Avatar } from 'antd';

interface ChatPillProps {
	id: number;
	message: string;
	sender: string;
}

const ChatPill = ({ id, message, sender }: ChatPillProps) => {
	return (
		<div
			className={`flex gap-4 ${
				sender === 'me' ? 'self-end flex-row-reverse' : 'self-start flex-row'
			}`}
		>
			<div className='items-start'>
				<Avatar
					size={{ xs: 36, sm: 42, md: 42, lg: 42, xl: 42, xxl: 42 }}
					src='https://ipfs.io/ipfs/QmZMY6iuh3dQiSVXBbLbMWcZConzVXqoBXjEeFC22LapkN'
					className='bg-[#BFBFBF] border-none'
				/>
			</div>
			<div>
				<div
					className={`flex flex-row gap-2 items-center ${
						sender === 'me' ? 'flex-row-reverse' : 'flex-row'
					}`}
				>
					<div className='font-semibold text-[0.7rem] md:text-[0.9rem]'>
						Ricky Smith
					</div>
					<div className='text-[#A4A8AE] font-medium md:text-[0.75rem] text-[0.65rem]'>
						10:42 PM
					</div>
				</div>
				<div
					className={`rounded-xl md:rounded-2xl py-1 md:py-3 font-medium text-[1rem] px-2 md:px-4 ${
						sender === 'me'
							? 'rounded-tr-none bg-[#2176FF] text-white'
							: 'rounded-tl-none bg-[#F8F8F8]'
					}`}
				>
					{message}
				</div>
			</div>
		</div>
	);
};

export default ChatPill;
