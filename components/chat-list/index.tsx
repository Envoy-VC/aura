import React from 'react';
import { ChatContext } from '../layout/nested-layout';
import { useClient } from '@xmtp/react-sdk';
import { useAddress } from '@thirdweb-dev/react';
import { Input } from 'antd';

import { ChatCard, CreateConversation } from '@/components';
import { PiMagnifyingGlassDuotone } from 'react-icons/pi';

import type { Conversation } from '@xmtp/react-sdk';

export interface ChatProps {
	conversations: Conversation[];
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

const Chats = ({ conversations, setActiveChat }: ChatProps) => {
	const address = useAddress();
	const { client } = useClient();

	if (!address) {
		return (
			<div className='text-lg font-semibold text-black opacity-75'>
				Connect your wallet
			</div>
		);
	}

	if (address && !client) {
		return (
			<div className='text-lg font-semibold text-black opacity-75'>
				Initialize XMTP to Chat
			</div>
		);
	}

	if (address && client) {
		return (
			<div className='flex flex-col w-full gap-[1px] overflow-y-scroll scrollbar-hide'>
				{typeof conversations !== undefined &&
					conversations.map((conversation, i) => (
						<ChatCard
							key={i}
							conversation={conversation}
							setActiveChat={setActiveChat}
						/>
					))}
			</div>
		);
	}
};

const ChatList = () => {
	const { conversations, setActiveChat } = React.useContext(ChatContext);
	return (
		<div className='h-screen border-r-2 border-[#F6F6F6] flex flex-col justify-start items-center py-4 px-1 gap-6 w-full md:w-[300px] lg:w-[400px]'>
			<div className='flex flex-row items-center justify-between w-full px-4 mx-4 mt-6 text-2xl font-semibold text-black'>
				<p>Chats</p>
				<CreateConversation />
			</div>
			<div className='w-full px-2'>
				<Input
					placeholder='Search'
					bordered={false}
					className='bg-[#F8F8F8] outline-none focus:outline-none hover:bg-[#F8F8F8] p-2 rounded-md'
					prefix={
						<PiMagnifyingGlassDuotone
							color='#666666'
							size={24}
							className='mr-2'
						/>
					}
				/>
			</div>
			<Chats conversations={conversations} setActiveChat={setActiveChat} />
		</div>
	);
};

export default ChatList;
