import React from 'react';
import { Avatar, Button } from 'antd';
import { useAddress, ConnectWallet, useSigner } from '@thirdweb-dev/react';
import { useClient } from '@xmtp/react-sdk';

import { PiSignOutDuotone, PiTelegramLogoDuotone } from 'react-icons/pi';

import logo from '@/public/logo.png';

const CustomConnect: React.FC = () => {
	const address = useAddress();
	const signer = useSigner();
	const { client, isLoading, initialize } = useClient();

	const init = React.useCallback(async () => {
		try {
			await initialize({ signer });
		} catch (error) {
			console.log(error);
		}
	}, [initialize]);

	if (!address) {
		return (
			<ConnectWallet
				theme='light'
				className='!bg-white !text-[#2176FF] !text-lg !p-2'
				style={{ paddingInline: '0px' }}
				btnTitle={'🔗'}
			/>
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
		>
			<p className='hidden xl:flex'>Vedant</p>
			<Avatar src={logo.src} size={32} className='!hidden ml-2 xl:!flex' />
		</Button>
	);
};

export default CustomConnect;
