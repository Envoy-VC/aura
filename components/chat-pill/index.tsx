import React from 'react';
import { Avatar, Skeleton, Spin } from 'antd';
import { useAddress } from '@thirdweb-dev/react';
import { ChatContext } from '../layout/nested-layout';
import { formatTimestamp } from '@/utils';
import { getProfile } from '@/services/profile';
import type { DecodedMessage } from '@xmtp/react-sdk';

const ChatPill = ({ content, sent, senderAddress }: DecodedMessage) => {
	const address = useAddress();
	const { profiles, isLoading } = React.useContext(ChatContext);
	let profile = getProfile(profiles, senderAddress);
	return (
		<div
			className={`flex flex-col ${
				senderAddress === address
					? 'self-end items-end'
					: 'self-start items-start'
			}`}
		>
			<div
				className={`flex flex-col gap-1 ${
					senderAddress === address ? 'items-end' : 'items-start'
				}`}
			>
				<div
					className={`rounded-xl lg:rounded-xl py-1 lg:py-2 font-medium text-[1rem] sm:text-[1rem] px-2 md:px-3 whitespace-pre-wrap max-w-[300px] lg:max-w-[500px] break-words ${
						senderAddress === address
							? 'bg-[#2176FF] text-white text-right w-fit'
							: 'bg-[#F8F8F8]'
					}`}
				>
					{content}
				</div>
			</div>
			<div className={`flex mt-[1px] items-center text-[10px] text-[#666666] `}>
				<div className='mx-[4px] font-medium'>{formatTimestamp(sent)}</div>
			</div>
		</div>
	);
};

export default ChatPill;
