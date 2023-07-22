import React from 'react';
import { useMessages, useStreamMessages } from '@xmtp/react-sdk';
import { useAddress } from '@thirdweb-dev/react';
import { ChatBox, ChatPill, ChatHeader } from '@/components';

import type { Conversation, DecodedMessage } from '@xmtp/react-sdk';
import { CustomDecodedMessage } from '@/types';

interface Props {
	conversation: Conversation;
}

const ChatArea = ({ conversation }: Props) => {
	const address = useAddress();
	const { messages, isLoading, error } = useMessages(conversation);
	const chatContainer = React.useRef<HTMLDivElement>(null);

	const [streamedMessages, setStreamedMessages] = React.useState<
		CustomDecodedMessage[]
	>([]);

	React.useEffect(() => {
		if (messages.length > 0) {
			let chats: CustomDecodedMessage[] = [];
			messages.map((message) => chats.push({ ...message, isSent: true }));
			setStreamedMessages(chats);
		}
	}, [messages]);

	const onMessage = React.useCallback(
		async (message: DecodedMessage) => {
			let conversations = streamedMessages;
			let msg = conversations.find(
				(ele) => ele.id === message.id && ele.senderAddress === address
			);
			if (msg !== undefined) {
				msg.isSent = true;
				setStreamedMessages(conversations);
			} else {
				setStreamedMessages((prev) => [...prev, { ...message, isSent: true }]);
			}
		},
		[streamedMessages]
	);

	useStreamMessages(conversation, onMessage);

	const Scroll = () => {
		const { offsetHeight, scrollHeight, scrollTop } =
			chatContainer.current as HTMLDivElement;
		chatContainer.current?.scrollTo(0, scrollHeight);
	};

	React.useEffect(() => {
		Scroll();
	}, [streamedMessages]);

	return (
		<div className='w-full flex flex-col justify-between items-start h-[92dvh] sm:h-[100vh] '>
			
				<ChatHeader conversation={conversation} />
		
			<div className='flex flex-col justify-end w-full h-full overflow-y-scroll scrollbar-hide'>
				<div
					className='flex flex-col w-full gap-1 p-4 px-2 overflow-y-scroll sm:px-8 scrollbar-hide'
					ref={chatContainer}
				>
					{!isLoading && !error ? (
						streamedMessages.map((message) => (
							<ChatPill key={message.id} {...message} />
						))
					) : (
						<>
							{error ? (
								<div className='mt-2 text-[#FF4D4F] text-[1rem]'>
									Error fetching Messages
								</div>
							) : (
								<div>loading</div>
							)}
						</>
					)}
				</div>
				<ChatBox
					conversation={conversation}
					streamedConversations={streamedMessages}
					setStreamedConversations={setStreamedMessages}
				/>
			</div>
		</div>
	);
};

export default ChatArea;
