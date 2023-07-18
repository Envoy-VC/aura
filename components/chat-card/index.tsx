import React from 'react';

import { Avatar, Button, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import { useEns } from '@/hooks';
import { useMessages } from '@xmtp/react-sdk';

import { getMessageTime } from '@/utils';

import { PiDotsThreeVerticalBold, PiUserBold } from 'react-icons/pi';
import { Conversation, SortDirection } from '@xmtp/react-sdk';

interface Props {
	conversation: Conversation;
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

const ChatCard = ({ conversation, setActiveChat }: Props) => {
	const { data, error, isLoading } = useEns({
		ethAddress: conversation?.peerAddress,
	});

	const { messages, isLoading: isMessagesLoading } = useMessages(conversation, {
		direction: SortDirection.SORT_DIRECTION_DESCENDING,
	});

	return (
		<div
			className={`flex flex-row items-center justify-between w-full gap-4 p-2 rounded-xl animate-all duration-200 ease-in-out select-none hover:bg-[#5a99ff2f]`}
		>
			<div
				className='flex flex-row gap-4 cursor-pointer'
				onClick={() => {
					setActiveChat(conversation);
					console.log(conversation?.peerAddress);
				}}
			>
				<div className='w-12 h-12 rounded-full'>
					{isLoading ? (
						<Skeleton.Avatar active={true} size={44} />
					) : (
						<Avatar
							size={{ xs: 42, sm: 48, md: 48, lg: 48, xl: 48, xxl: 48 }}
							src={
								data?.avatar || (
									<PiUserBold
										size={32}
										color='#666666'
										className='m-auto mt-1'
									/>
								)
							}
							className='bg-[#f5f5f5]'
						/>
					)}
				</div>
				<div className='w-fit'>
					<p className={`font-semibold text-[1rem] !max-w-[300px]`}>
						{isLoading ? (
							<Skeleton
								active
								paragraph={{
									rows: 0,
									className: '!m-0 !p-0',
								}}
								className='!w-[350px]'
							/>
						) : (
							data?.ensName ||
							conversation?.peerAddress.slice(0, 6) +
								'...' +
								conversation?.peerAddress.slice(-4)
						)}
					</p>
					<div className='text-[#A4A8AE] font-medium text-[0.75rem] flex flex-row'>
						<div>
							{isMessagesLoading ? (
								<Skeleton
									active
									paragraph={{
										rows: 0,
										className: '!m-0 !p-0',
									}}
									className='!w-[350px]'
								/>
							) : messages.at(0)?.content?.length > 30 ? (
								messages.at(0)?.content?.slice(0, 30) + '...'
							) : (
								(messages.at(0)?.content as string)
							)}
						</div>
						<div>
							• {getMessageTime(messages?.at(0)?.sent.getTime()! / 1000)}
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
