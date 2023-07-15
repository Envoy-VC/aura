import React from 'react';
import { Modal, Button } from 'antd';
import {
	metamaskWallet,
	walletConnect,
	trustWallet,
	useConnect,
} from '@thirdweb-dev/react';

import { PiWalletFill } from 'react-icons/pi';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const metamaskConfig = metamaskWallet();
const trustWalletConfig = trustWallet();
const walletConnectConfig = walletConnect();

const ConnectWalletModal = ({ modalOpen, setModalOpen }: Props) => {
	const connect = useConnect();

	const handleModalState = (state: boolean) => {
		setModalOpen(state);
	};

	const handleConnect = async (wallet: any) => {
		try {
			await connect(wallet, { chainId: 1 });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			title={
				<>
					<div className='flex flex-row items-center justify-center gap-2'>
						<PiWalletFill color='#666666' size={24} />
						Connect Wallet
					</div>
				</>
			}
			footer={<></>}
			open={modalOpen}
			onCancel={() => handleModalState(false)}
		>
			<div className='flex flex-col gap-2'>
				<Button
					className='flex flex-row gap-2 text-lg font-medium py-4 hover:!text-black'
					size='large'
					onClick={() => handleConnect(metamaskConfig)}
				>
					MetaMask
				</Button>
				<Button
					className='flex flex-row gap-2 text-lg font-medium py-4 hover:!text-black'
					size='large'
					onClick={() => handleConnect(trustWalletConfig)}
				>
					Trust Wallet
				</Button>
				<Button
					className='flex flex-row gap-2 text-lg font-medium py-4 hover:!text-black'
					size='large'
					onClick={() => handleConnect(walletConnectConfig)}
				>
					WalletConnect
				</Button>
			</div>
		</Modal>
	);
};

export default ConnectWalletModal;
