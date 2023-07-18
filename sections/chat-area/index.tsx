import React from 'react';

import { ChatBox, ChatPill } from '@/components';

import type { IMessage } from '@/types';

const ChatArea = () => {
	const [messages, setMessages] = React.useState<IMessage[]>([]);

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
				{messages &&
					messages.map((message, index) => (
						<ChatPill key={index} {...message} />
					))}
			</div>
			<ChatBox setMessages={setMessages} />
		</div>
	);
};

export default ChatArea;
