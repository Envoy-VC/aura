import React from 'react';
import { useSendMessage, useClient } from '@xmtp/react-sdk';
import {
	RemoteAttachment,
	ContentTypeRemoteAttachment,
	Attachment,
} from '@xmtp/content-type-remote-attachment';
import { Input, Button, Spin } from 'antd';
import ChatButtons from '../chat-buttons';

import { PiArrowRightBold, PiTrashBold } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

import type { Conversation } from '@xmtp/react-sdk';
interface Props {
	conversation: Conversation;
}

const ChatBox = ({ conversation }: Props) => {
	const { client } = useClient();
	const [message, setMessage] = React.useState<string>('');
	const [remoteAttachment, setRemoteAttachment] =
		React.useState<RemoteAttachment>();
	const [previewFile, setPreviewFile] = React.useState<Attachment>();

	const [isSending, setIsSending] = React.useState<boolean>(false);
	const { sendMessage } = useSendMessage(conversation);

	const handleSendMessage = async () => {
		try {
			setIsSending(true);
			if (remoteAttachment !== undefined) {
				let res = await conversation.send(remoteAttachment, {
					contentFallback: `[Attachment] Cannot display ${remoteAttachment.filename}. This app does not support attachments yet.`,
					contentType: ContentTypeRemoteAttachment,
				});
				console.log(res);
			} else if (message !== undefined && message !== '') {
				let res = await sendMessage(message);
				console.log(res);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSending(false);
			setRemoteAttachment(undefined);
			setMessage('');
		}
	};

	React.useEffect(() => {
		setMessage('');
	}, [remoteAttachment]);

	return (
		<div className='flex flex-col gap-2 w-full border-t-2 border-[#F2F2F2] p-4 pt-6'>
			{remoteAttachment !== undefined && (
				<div className='flex flex-row items-center justify-center gap-2 w-fit'>
					<div
						className={`flex items-center justify-center text-sm text-[#666666]`}
					>
						{remoteAttachment.filename}
					</div>
					<Button
						type='ghost'
						size='small'
						className='!p-[0px] !animate-none mr-3'
						onClick={() => {
							setRemoteAttachment(undefined);
						}}
					>
						<PiTrashBold color='#666666' size={16} />
					</Button>
				</div>
			)}
			<div className='flex flex-row items-center w-full gap-2'>
				<ChatButtons setRemoteAttachment={setRemoteAttachment} />
				<div className='flex flex-col items-start justify-start w-full gap-4'>
					<Input.TextArea
						placeholder='Write Something...'
						value={message}
						bordered={false}
						disabled={isSending || remoteAttachment !== undefined}
						className='bg-[#F8F8F8] outline-none focus:outline-none hover:bg-[#F8F8F8] p-2 py-[12px] rounded-md text-[1rem] focus:bg-[#F8F8F8] items-center'
						onChange={(e) => setMessage(e.target.value)}
						autoSize={{ minRows: 1 }}
					/>
				</div>
				<Button
					type='primary'
					className={`bg-[#2176FF] w-fit !py-6 flex items-center flex-row-reverse font-medium ${
						isSending ? 'opacity-60' : 'opacity-100'
					}`}
					size='large'
					icon={
						!isSending && (
							<PiArrowRightBold color='#fff' size={24} className='ml-2' />
						)
					}
					onClick={() => {
						handleSendMessage();
					}}
				>
					{isSending ? (
						<Spin
							indicator={
								<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />
							}
						/>
					) : (
						'Send'
					)}
				</Button>
			</div>
		</div>
	);
};

export default ChatBox;
