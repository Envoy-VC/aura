import React from 'react';
import { ChatContext } from '../layout/nested-layout';
import { Avatar } from 'antd';

import { getProfile } from '@/services/profile';
import { PiUserBold } from 'react-icons/pi';

import type { Conversation } from '@xmtp/react-sdk';

interface Props {
	conversation: Conversation;
}

const ChatHeader = ({ conversation }: Props) => {
	const { profiles } = React.useContext(ChatContext);
	let profile = getProfile(profiles, conversation.peerAddress);

	return (
		<div className='flex flex-row items-start justify-start gap-4 p-3'>
			<Avatar
				size={{ xs: 36, sm: 36, md: 40, lg: 42, xl: 42, xxl: 42 }}
				src={profile?.avatar || <PiUserBold size={32} color='#666666' />}
				className='flex ml-2'
			/>
			<div className='font-semibold text-[0.9rem] lg:text-[1rem]'>
				{profile.name ||
					conversation.peerAddress.slice(0, 4) +
						'...' +
						conversation.peerAddress.slice(-4)}
			</div>
		</div>
	);
};

export default ChatHeader;
