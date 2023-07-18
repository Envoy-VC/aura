import React from 'react';
import { Avatar, Button, Skeleton } from 'antd';
import { useAddress, useSigner, useDisconnect } from '@thirdweb-dev/react';
import { useClient } from '@xmtp/react-sdk';

import { useEns } from '@/hooks';

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
	const { data, error, isLoading } = useEns({
		ethAddress: address,
	});

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
					className='flex flex-row-reverse items-center gap-4 py-4 text-lg font-medium text-[#2176FF]'
					onClick={() => setConnectWalletModalOpen(true)}
				>
					<p className='hidden xl:flex'>Connect</p>
					<PiWalletFill color='#2176FF' size={24} />
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
					<p className='hidden xl:flex'>Initialize</p>
					<PiTelegramLogoDuotone color='#2176FF' size={24} />
				</Button>
			</>
		);
	}

	return (
		<Button
			type='ghost'
			icon={<PiSignOutDuotone color='#666666' size={24} />}
			className='flex items-center gap-4 text-lg font-medium text-[#8f8f8f] flex-row-reverse'
			onClick={disconnect}
		>
			<p className='hidden xl:flex'>
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
					data?.ensName || address.slice(0, 4) + '...'
				)}
			</p>
			{isLoading ? (
				<Skeleton.Avatar active={true} size={44} />
			) : (
				<Avatar
					size={32}
					src={data?.avatar || <PiUserBold size={32} color='#666666' />}
					className='!hidden ml-2 xl:!flex'
				/>
			)}
		</Button>
	);
};

export default CustomConnect;
