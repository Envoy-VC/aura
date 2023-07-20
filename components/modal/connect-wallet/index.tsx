import React from 'react';
import Image from 'next/image';
import { Modal, Button } from 'antd';
import {
	metamaskWallet,
	walletConnect,
	trustWallet,
	useConnect,
} from '@thirdweb-dev/react';

import { PiWalletFill } from 'react-icons/pi';
import metamaskLogo from '@/public/metamask.png';
import walletConnectLogo from '@/public/walletConnect.png';

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
			await connect(wallet, { chainId: 1 }).then(() => {
				setModalOpen(false);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			title={
				<div className='flex flex-row items-center justify-center gap-3 text-xl font-semibold text-[#1A1523]'>
					<PiWalletFill color='#666666' size={24} />
					Connect Wallet
				</div>
			}
			footer={null}
			open={modalOpen}
			onCancel={() => handleModalState(false)}
			width={350}
			className='p-0 rounded-[1.75rem] bg-inherit'
		>
			<div className='flex flex-col gap-2 p-0 mt-8'>
				<Button
					className='flex flex-row gap-4 items-center !text-[1.15rem] !py-6 text-[#1A1523] hover:!text-[#1A1523] !bg-[#fdfdfd] hover:!bg-[#fdfdfd] !rounded-xl transition-all duration-100 ease-linear font-[500]'
					size='large'
					onClick={() => handleConnect(metamaskConfig)}
				>
					<Image src={metamaskLogo} alt='metamask' width={24} height={24} />
					MetaMask
				</Button>
				<Button
					className='flex flex-row gap-4 items-center !text-[1.15rem] !py-6 text-[#1A1523] hover:!text-[#1A1523] !bg-[#fdfdfd] hover:!bg-[#fdfdfd] !rounded-xl transition-all duration-100 ease-linear font-[500]'
					size='large'
					onClick={() => handleConnect(walletConnectConfig)}
				>
					<Image
						src={walletConnectLogo}
						alt='metamask'
						width={24}
						height={24}
					/>
					WalletConnect
				</Button>
			</div>
		</Modal>
	);
};

export default ConnectWalletModal;
