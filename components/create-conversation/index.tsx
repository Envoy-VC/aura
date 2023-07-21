import React from 'react';
import { ChatContext } from '../layout/nested-layout';
import { Button } from 'antd';
import { CreateConversationModal } from '../modal';

import { PiPlusCircleDuotone } from 'react-icons/pi';

const CreateConversation = () => {
	const { isLoading } = React.useContext(ChatContext);
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);

	const handleModalState = (state: boolean) => {
		setModalOpen(state);
	};

	return (
		<div>
			<CreateConversationModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
			/>
			<Button
				type='ghost'
				size='middle'
				className='p-[0px] animate-none'
				onClick={() => handleModalState(true)}
				disabled={isLoading}
			>
				<PiPlusCircleDuotone color='#666666' size={32} />
			</Button>
		</div>
	);
};

export default CreateConversation;
