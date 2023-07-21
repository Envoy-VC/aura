import React from 'react';
import { Button } from 'antd';
import CreateConversationModal from '../modal/create-conversation';

import { PiPlusCircleDuotone } from 'react-icons/pi';

const CreateConversation = () => {
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
			>
				<PiPlusCircleDuotone color='#666666' size={32} />
			</Button>
		</div>
	);
};

export default CreateConversation;
