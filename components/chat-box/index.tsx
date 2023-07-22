import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { Input, Button, Spin } from 'antd';
import { useSendMessage } from '@xmtp/react-sdk';
import ChatButtons from '../chat-buttons';
import { PiTranslateDuotone, PiArrowRightBold } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

import type { Conversation } from '@xmtp/react-sdk';
import { CustomDecodedMessage } from '../../types/index';
interface Props {
	conversation: Conversation;
	streamedConversations: CustomDecodedMessage[];
	setStreamedConversations: React.Dispatch<
		React.SetStateAction<CustomDecodedMessage[]>
	>;
}

const ChatBox = ({
	conversation,
	streamedConversations,
	setStreamedConversations,
}: Props) => {
	const address = useAddress();
	const [message, setMessage] = React.useState<string>('');
	const [isSending, setIsSending] = React.useState<boolean>(false);
	const { sendMessage } = useSendMessage(conversation);

	const handleSendMessage = async (content: string) => {
		if (!content) return;
		try {
			setIsSending(true);
			let message = await conversation?.prepareMessage(content);
			let id = await message.messageID();
			setStreamedConversations([
				...streamedConversations,
				{
					id: id,
					content: content,
					senderAddress: address!,
					sent: new Date(),
					isSent: false,
				},
			]);
			await message.send();
		} catch (error) {
			console.log(error);
		} finally {
			setMessage('');
			setIsSending(false);
		}
	};

	return (
		<div className='flex flex-row gap-2 w-full items-center border-t-2 border-[#F2F2F2] p-4 pt-6'>
			<ChatButtons />
			<div className='w-full'>
				<Input.TextArea
					placeholder='Write Something...'
					value={message}
					bordered={false}
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
				disabled={isSending}
				icon={
					!isSending && (
						<PiArrowRightBold color='#fff' size={24} className='ml-2' />
					)
				}
				onClick={() => handleSendMessage(message)}
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
	);
};

export default ChatBox;
