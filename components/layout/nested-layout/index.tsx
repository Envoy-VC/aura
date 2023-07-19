import React from 'react';
import { ethers } from 'ethers';
import { Conversation, useConversations } from '@xmtp/react-sdk';
import { Sidebar, Navbar } from '@/components';

import { IENSDetails } from '@/types';

import { ALCHEMY_API_KEY } from '@/utils';

interface IChatContext {
	conversations: Conversation[];
	activeChat: Conversation | null;
	setActiveChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
	ensDetails: IENSDetails[];
	isLoading: boolean;
}

export const ChatContext = React.createContext<IChatContext>({
	conversations: [],
	activeChat: null,
	setActiveChat: () => {},
	ensDetails: [],
	isLoading: true,
});

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const { conversations } = useConversations();
	const [activeChat, setActiveChat] = React.useState<Conversation | null>(null);
	const [ensDetails, setEnsDetails] = React.useState<IENSDetails[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	let provider = new ethers.providers.AlchemyProvider(
		'homestead',
		ALCHEMY_API_KEY
	);

	React.useEffect(() => {
		const fetchEnsDetails = async (ethAddress: string) => {
			let data: IENSDetails;
			let ensName = await provider?.lookupAddress(ethAddress);
			if (ensName !== null) {
				let resolver = await provider?.getResolver(ensName);
				let avatar = await provider?.getAvatar(ensName);
				data = {
					address: ethAddress,
					ensName: ensName || '',
					ensAvatar: avatar || '',
					resolver: resolver || null,
				};
			} else {
				data = {
					address: ethAddress,
					ensName: '',
					ensAvatar: '',
					resolver: null,
				};
			}
			return data;
		};
		const resolve = async () => {
			try {
				setIsLoading(true);
				if (conversations.length > 0) {
					let ensDetails: IENSDetails[] = [];
					let promises = conversations.map(async (conversation) => {
						let peerAddress = conversation.peerAddress;
						let clientAddress = conversation.clientAddress;
						let peerAddressDetails = ensDetails.find(
							(ensDetail) => ensDetail.address === peerAddress
						);
						let clientEnsDetails = ensDetails.find(
							(ensDetail) => ensDetail.address === clientAddress
						);
						if (!clientEnsDetails) {
							let clientEnsDetails = await fetchEnsDetails(clientAddress);
							console.log(clientEnsDetails);
							ensDetails.push(clientEnsDetails);
						}
						if (!peerAddressDetails) {
							let peerAddressDetails = await fetchEnsDetails(peerAddress);
							console.log(peerAddressDetails);
							ensDetails.push(peerAddressDetails);
						}
					});

					Promise.all(promises).then(() => {
						setIsLoading(false);
						setEnsDetails(ensDetails);
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
				ensDetails,
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
