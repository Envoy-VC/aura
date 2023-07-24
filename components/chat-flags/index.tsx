import React from 'react';
import type { DecodedMessage } from '@xmtp/react-sdk';

interface Props {
	streamedMessages: DecodedMessage[];
	index: number;
}

const Flag = ({ content }: { content: string }) => (
	<div className='flex flex-row items-center justify-start w-full my-2'>
		<div className='border-[1px] border-[#F2F2F2] mx-4 w-full'></div>
		<span className='min-w-fit text-semibold text-[#bdbdbd]'>{content}</span>
		<div className='border-[1px] border-[#F2F2F2] mx-4 w-full'></div>
	</div>
);

const ChatFlags = ({ streamedMessages, index }: Props) => {
	if (index === 0) return <Flag content='Start of Conversation' />;
	const isSameDay =
		streamedMessages[index].sent.getDate() ===
		streamedMessages[index - 1].sent.getDate();
	const date = streamedMessages[index].sent.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	if (!isSameDay) return <Flag content={date} />;
};

export default ChatFlags;
