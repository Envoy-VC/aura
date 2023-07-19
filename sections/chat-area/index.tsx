import React from 'react';
import { useMessages } from '@xmtp/react-sdk';
import { ChatBox, ChatPill } from '@/components';

import type { Conversation, DecodedMessage } from '@xmtp/react-sdk';

interface Props {
	conversation: Conversation;
}

const ChatArea = ({ conversation }: Props) => {
	const { error, messages, isLoading } = useMessages(conversation);

	const chatContainer = React.useRef<HTMLDivElement>(null);

	const Scroll = () => {
		const { offsetHeight, scrollHeight, scrollTop } =
			chatContainer.current as HTMLDivElement;
		if (scrollHeight <= scrollTop + offsetHeight + 100) {
			chatContainer.current?.scrollTo(0, scrollHeight);
		}
	};

	React.useEffect(() => {
		Scroll();
	}, [messages]);

	return (
		<div className='w-full flex flex-col justify-end items-start h-[100dvh]'>
			<div
				className='flex flex-col w-full gap-1 p-4 px-8 overflow-y-scroll scrollbar-hide'
				ref={chatContainer}
			>
				{!isLoading ? (
					messages.map((message) => (
						<ChatPill key={message.id} {...message} toBytes={message.toBytes} />
					))
				) : (
					<div>loading</div>
				)}
			</div>
			<ChatBox />
		</div>
	);
};

export default ChatArea;
