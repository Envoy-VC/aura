import React from 'react';
import { Button } from 'antd';
import UploadAttachmentModal from '../modal/upload-attachment';
import { TbPhoto } from 'react-icons/tb';

import { RemoteAttachment } from '@xmtp/content-type-remote-attachment';
interface Props {
	setRemoteAttachment: React.Dispatch<
		React.SetStateAction<RemoteAttachment | undefined>
	>;
}

const ChatButtons = ({ setRemoteAttachment }: Props) => {
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	return (
		<>
			<UploadAttachmentModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				setRemoteAttachment={setRemoteAttachment}
			/>
			<div className='flex flex-row items-center justify-start gap-0'>
				<Button
					type='ghost'
					size='middle'
					className='p-[0px] animate-none'
					onClick={() => setModalOpen(true)}
				>
					<TbPhoto color='#939393' size={30} />
				</Button>
			</div>
		</>
	);
};

export default ChatButtons;
