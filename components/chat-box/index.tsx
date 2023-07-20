import React from 'react';
import { Input, Button } from 'antd';
import { useSendMessage } from '@xmtp/react-sdk';

import ChatButtons from '../chat-buttons';
import { PiTranslateDuotone, PiArrowRightBold } from 'react-icons/pi';

import type { Conversation } from '@xmtp/react-sdk';
interface Props {
	conversation: Conversation;
}

const ChatBox = ({ conversation }: Props) => {
	const [message, setMessage] = React.useState<string>('');
	const [isSending, setIsSending] = React.useState<boolean>(false);
	const { sendMessage } = useSendMessage(conversation);

	const handleSendMessage = async (content: string) => {
		if (!content) return;
		try {
			setIsSending(true);
			await sendMessage(content);
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
				<Input
					placeholder='Write Something...'
					value={message}
					bordered={false}
					className='bg-[#F8F8F8] outline-none focus:outline-none hover:bg-[#F8F8F8] p-2 py-[12px] rounded-md text-[1rem] focus:bg-[#F8F8F8] items-center'
					suffix={
						<PiTranslateDuotone color='#666666' size={24} className='mr-2' />
					}
					onChange={(e) => setMessage(e.target.value)}
					onPressEnter={() => handleSendMessage(message)}
				/>
			</div>
			<Button
				type='primary'
				className={`bg-[#2176FF] w-fit !py-6 flex items-center flex-row-reverse font-medium ${
					isSending ? 'opacity-50' : ''
				}`}
				size='large'
				disabled={isSending}
				icon={<PiArrowRightBold color='#fff' size={24} className='ml-2' />}
				onClick={() => handleSendMessage(message)}
			>
				Send
			</Button>
		</div>
	);
};

export default ChatBox;
