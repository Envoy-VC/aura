import React from 'react';
import { Conversation, useConversations } from '@xmtp/react-sdk';
import { Sidebar, Navbar } from '@/components';

interface IChatContext {
	conversations: Conversation[];
	activeChat: Conversation | null;
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

export const ChatContext = React.createContext<IChatContext>({
	conversations: [],
	activeChat: null,
	setActiveChat: () => {},
});

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const { conversations, error, isLoading } = useConversations();
	const [activeChat, setActiveChat] = React.useState<Conversation | null>(null);
	return (
		<ChatContext.Provider value={{ conversations, activeChat, setActiveChat }}>
			<div className='flex flex-col sm:flex-row'>
				<Sidebar />
				<Navbar />
				{children}
			</div>
		</ChatContext.Provider>
	);
};

export default NestedLayout;
