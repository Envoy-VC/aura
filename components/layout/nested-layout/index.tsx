import React from 'react';
import { Conversation, useConversations } from '@xmtp/react-sdk';
import { Sidebar, Navbar } from '@/components';

import { getENSProfile, getLensProfile } from '@/services/profile';

import { ProfileDetailsType } from '@/types';

interface IChatContext {
	conversations: Conversation[];
	activeChat: Conversation | null;
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
	profiles: ProfileDetailsType[];
	isLoading: boolean;
}

export const ChatContext = React.createContext<IChatContext>({
	conversations: [],
	activeChat: null,
	setActiveChat: () => {},
	profiles: [],
	isLoading: true,
});

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const { conversations } = useConversations();
	const [activeChat, setActiveChat] = React.useState<Conversation | null>(null);
	const [profiles, setProfiles] = React.useState<ProfileDetailsType[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const resolve = async () => {
			try {
				setIsLoading(true);
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
				conversations,
				activeChat,
				setActiveChat,
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
