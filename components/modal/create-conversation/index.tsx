import React from 'react';
import { ethers } from 'ethers';

import { Modal, Input } from 'antd';
import { useDebounce } from '@/hooks';

import ChatCard from './chat-card';
import { PiEnvelopeSimpleDuotone, PiMagnifyingGlassBold } from 'react-icons/pi';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateConversationModal = ({ modalOpen, setModalOpen }: Props) => {
	const [value, setValue] = React.useState<string>('');
	const [error, setError] = React.useState<boolean>(false);
	const debouncedValue = useDebounce<string>(value, 1000);

	const isValidEthAddress = (address: string) => {
		if (!ethers.utils.isAddress(address)) {
			setError(true);
		} else {
			setError(false);
		}
	};

	const handleValueChange = (value: string) => {
		isValidEthAddress(value);
		setValue(value);
	};

	React.useEffect(() => {
		if (debouncedValue === '') {
			setError(false);
		}
	}, [debouncedValue]);

	return (
		<Modal
			title={
				<div className='flex flex-row justify-start gap-3 text-[1rem] font-bold text-[#1A1523]'>
					<PiEnvelopeSimpleDuotone color='#2176FF' size={24} />
					New Message
				</div>
			}
			footer={null}
			open={modalOpen}
			onCancel={() => {
				setModalOpen(false);
			}}
		>
			<div className='mt-6'>
				<Input
					addonAfter={<PiMagnifyingGlassBold size={24} color='#666666' />}
					placeholder='Search any (0x Wallet) to message... '
					size='middle'
					onChange={(e) => handleValueChange(e.target.value)}
					status={error ? 'error' : ''}
				/>
				{debouncedValue && !error && (
					<div className='mt-2'>
						<ChatCard value={debouncedValue} />
					</div>
				)}
			</div>
		</Modal>
	);
};

export default CreateConversationModal;
