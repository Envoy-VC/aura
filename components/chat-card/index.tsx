import React from 'react';

import { Avatar, Button } from 'antd';
import { useRouter } from 'next/router';

import { PiDotsThreeVerticalBold } from 'react-icons/pi';

interface Props {
	isActive?: boolean;
}

const ChatCard = ({ isActive }: Props) => {
	const router = useRouter();
	return (
		<div
			className={`flex flex-row items-center justify-between w-full gap-4 p-2 rounded-xl animate-all duration-200 ease-in-out ${
				isActive ? 'bg-[#0F2131]' : 'hover:bg-[#f0f0f0]'
			}`}
			onClick={() => router.push('abc')}
		>
			<div className='flex flex-row gap-4'>
				<div className='w-12 h-12 rounded-full'>
					<Avatar
						size={{ xs: 42, sm: 48, md: 48, lg: 48, xl: 48, xxl: 48 }}
						src='https://ipfs.io/ipfs/QmZMY6iuh3dQiSVXBbLbMWcZConzVXqoBXjEeFC22LapkN'
						className='bg-[#BFBFBF] border-none'
					/>
				</div>
				<div className=''>
					<p
						className={`font-semibold text-[1rem] ${
							isActive ? 'text-white ' : 'text-[#000]'
						}`}
					>
						Ricky Smith
					</p>
					<div className='text-[#A4A8AE] font-medium text-[0.75rem] flex flex-row'>
						<div>You: Okay, Let&lsquo;s get...</div>
						<div className={`${isActive ? 'text-[#236baa]' : ''}`}>
							• 1 min ago
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-end'>
				<Button type='ghost' size='middle' className='p-[0px] animate-none'>
					<PiDotsThreeVerticalBold color='#666666' size={18} />
				</Button>
			</div>
		</div>
	);
};

export default ChatCard;
