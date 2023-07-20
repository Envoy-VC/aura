import React from 'react';
import { Avatar, Button, Skeleton } from 'antd';
import { useAddress, useSigner, useDisconnect } from '@thirdweb-dev/react';
import { useClient } from '@xmtp/react-sdk';
import { ChatContext } from '../layout/nested-layout';
import { getProfile } from '@/services/profile';
import { ConnectWalletModal } from '../modal';

import {
	PiSignOutDuotone,
	PiTelegramLogoDuotone,
	PiWalletFill,
	PiUserBold,
} from 'react-icons/pi';

const CustomConnect: React.FC = () => {
	const address = useAddress();
	const disconnect = useDisconnect();
	const signer = useSigner();
	const { client, initialize } = useClient();
	const { profiles, isLoading } = React.useContext(ChatContext);
	let profile = getProfile(profiles, address!);

	const [connectWalletModalOpen, setConnectWalletModalOpen] =
		React.useState<boolean>(false);

	const init = async () => {
		try {
			await initialize({
				signer,

				options: {
					env: 'production',
				},
			}).then((res) => console.log(res));
		} catch (error) {
			console.log(error);
		}
	};

	if (!address) {
		return (
			<>
				<ConnectWalletModal
					modalOpen={connectWalletModalOpen}
					setModalOpen={setConnectWalletModalOpen}
				/>
				<Button
					type='ghost'
					className='flex flex-row-reverse items-center gap-4 py-4 text-[1rem] font-medium text-[#2176FF]'
					onClick={() => setConnectWalletModalOpen(true)}
				>
					<p className='flex'>Connect</p>
					<PiWalletFill color='#2176FF' size={22} />
				</Button>
			</>
		);
	}

	if (address && !client) {
		return (
			<>
				<Button
					type='ghost'
					size='middle'
					className='flex flex-row-reverse items-center gap-4 py-4 text-[1rem] font-medium text-[#2176FF]'
					onClick={init}
				>
					<p className='flex'>Initialize</p>
					<PiTelegramLogoDuotone color='#2176FF' size={22} />
				</Button>
			</>
		);
	}

	return (
		<Button
			type='ghost'
			icon={<PiSignOutDuotone color='#666666' size={24} />}
			className='flex items-center gap-4 text-[1rem] font-medium text-[#8f8f8f] flex-row-reverse mt-3'
			onClick={disconnect}
		>
			<p className='flex'>
				{isLoading ? (
					<Skeleton
						active
						paragraph={{
							rows: 0,
							className: '!m-0 !p-0',
						}}
						className='!w-[350px]'
					/>
				) : (
					profile?.name || address.slice(0, 4) + '...' + address.slice(-4)
				)}
			</p>
			{isLoading ? (
				<Skeleton.Avatar active={true} size={32} />
			) : (
				<Avatar
					size={36}
					src={profile?.avatar || <PiUserBold size={32} color='#666666' />}
					className='flex ml-2'
				/>
			)}
		</Button>
	);
};

export default CustomConnect;
