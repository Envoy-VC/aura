import React from 'react';
import { Avatar, Button } from 'antd';
import { CreateAccountModal } from '../modal';

import {
	PiSignOutDuotone,
	PiWalletFill,
	PiUserPlusDuotone,
} from 'react-icons/pi';

import logo from '@/public/logo.png';

const CustomConnect: React.FC = () => {
	const address = 'a';
	const account = 'a';

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);

	if (!address) {
		return (
			<Button
				type='ghost'
				className='flex flex-row-reverse items-center gap-4 py-4 text-lg font-medium text-[#2176FF]'
			>
				<p className='hidden xl:flex'>Connect</p>
				<PiWalletFill color='#2176FF' size={24} />
			</Button>
		);
	}

	if (address && !account) {
		return (
			<>
				<CreateAccountModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
				<Button
					type='ghost'
					size='middle'
					className='flex flex-row-reverse items-center gap-4 py-4 text-[1rem] font-medium text-[#2176FF]'
					onClick={() => setModalOpen(true)}
				>
					<p className='hidden xl:flex'>Create Account</p>
					<PiUserPlusDuotone color='#2176FF' size={24} />
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
