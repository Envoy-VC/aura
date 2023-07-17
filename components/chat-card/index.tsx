import React from 'react';

import { Avatar, Button } from 'antd';
import { useRouter } from 'next/router';
import { useEns } from '@/hooks';

import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import type { Conversation } from '@xmtp/react-sdk';

interface ChatCardProps extends Conversation {}

const ChatCard = ({ clientAddress, peerAddress }: ChatCardProps) => {
	const { data, error, loading } = useEns({ ethAddress: peerAddress });
	const router = useRouter();
	return (
		<div
			className={`flex flex-row items-center justify-between w-full gap-4 p-2 rounded-xl animate-all duration-200 ease-in-out select-none hover:bg-[#5a99ff2f]`}
		>
			<div
				className='flex flex-row gap-4 cursor-pointer'
				onClick={() => router.push('abc')}
			>
				<div className='w-12 h-12 rounded-full'>
					<Avatar
						size={{ xs: 42, sm: 48, md: 48, lg: 48, xl: 48, xxl: 48 }}
						src={
							data?.avatar ||
							'https://ipfs.io/ipfs/QmZMY6iuh3dQiSVXBbLbMWcZConzVXqoBXjEeFC22LapkN'
						}
						className='bg-[#BFBFBF] border-none'
					/>
				</div>
				<div className=''>
					<p className={`font-semibold text-[1rem]`}>
						{data?.ensName ||
							peerAddress.slice(0, 6) + '...' + peerAddress.slice(-4)}
					</p>
					<div className='text-[#A4A8AE] font-medium text-[0.75rem] flex flex-row'>
						<div>You: Okay, Let&lsquo;s get...</div>
						<div>• 1 min ago</div>
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
