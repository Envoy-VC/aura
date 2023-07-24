import React from 'react';
import {
	Conversation,
	useConversations,
	useStreamConversations,
	Client,
} from '@xmtp/react-sdk';

import { Sidebar, Navbar } from '@/components';
import { getENSProfile, getLensProfile } from '@/services/profile';

import type { ProfileDetailsType } from '@/types';

interface IChatContext {
	conversations: Conversation[];
	activeChat: Conversation | null;
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
	client: Client | null;
	setClient: React.Dispatch<React.SetStateAction<Client | null>>;
	profiles: ProfileDetailsType[];
	isLoading: boolean;
}

export const ChatContext = React.createContext<IChatContext>({
	conversations: [],
	activeChat: null,
	setActiveChat: () => {},
	client: null,
	setClient: () => {},
	profiles: [],
	isLoading: true,
});

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const { conversations } = useConversations();
	const [streamedConversations, setStreamedConversations] = React.useState<
		Conversation[]
	>([]);
	const [client, setClient] = React.useState<Client | null>(null);
	const [activeChat, setActiveChat] = React.useState<Conversation | null>(null);
	const [profiles, setProfiles] = React.useState<ProfileDetailsType[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	const onConversation = React.useCallback(
		async (conversation: Conversation) => {
			let ensProfile = await getENSProfile(conversation?.peerAddress);
			let lensProfile = await getLensProfile(conversation?.peerAddress);
			setProfiles((prev) => [
				...prev,
				{
					address: conversation?.peerAddress,
					domains: [ensProfile],
					socials: [lensProfile],
				},
			]);
			setStreamedConversations((prev) => [...prev, conversation]);
		},
		[]
	);

	const streamConversations = useStreamConversations(onConversation);

	React.useEffect(() => {
		const resolve = async () => {
			try {
				setIsLoading(true);
				setStreamedConversations(conversations);
				let profiles: ProfileDetailsType[] = [];
				if (conversations.length > 0) {
					// Create Profiles with conversations
					profiles.push({
						address: conversations.at(0)!.clientAddress,
						domains: [],
						socials: [],
					});
					conversations.map((conversation) => {
						profiles.push({
							address: conversation?.peerAddress,
							domains: [],
							socials: [],
						});
					});

					// Fetch ENS Details and Lens Profiles
					let promises = profiles.map(async (profile) => {
						let peerAddress = profile.address;
						let peerProfile = profiles
							.filter((profile) => profile.address === peerAddress)
							.at(0);
						let ensProfile = await getENSProfile(peerAddress);
						let lensProfile = await getLensProfile(peerAddress);
						peerProfile!.domains!.push(ensProfile);
						peerProfile!.socials!.push(lensProfile);
					});

					Promise.all(promises).then(() => {
						setIsLoading(false);
						setProfiles(profiles);
					});
				}
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		resolve();
	}, [conversations]);

	return (
		<ChatContext.Provider
			value={{
				conversations: streamedConversations,
				activeChat,
				setActiveChat,
				client,
				setClient,
				profiles,
				isLoading,
			}}
		>
			<div className='flex flex-col sm:flex-row'>
				<Sidebar />
				<Navbar />
				{children}
			</div>
		</ChatContext.Provider>
	);
};

export default NestedLayout;
