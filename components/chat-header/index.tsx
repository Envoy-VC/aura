import React from 'react';
import { Avatar } from 'antd';

import { PiUserBold } from 'react-icons/pi';
import { IENSDetails } from '@/types';

interface Props {
	data: IENSDetails;
}

const ChatHeader = ({ data }: Props) => {
	return (
		<div className='flex flex-row items-start justify-start gap-4 p-3'>
			<Avatar
				size={{ xs: 36, sm: 36, md: 40, lg: 42, xl: 42, xxl: 42 }}
				src={data?.ensAvatar || <PiUserBold size={32} color='#666666' />}
				className='flex ml-2'
			/>
			<div className='font-semibold text-[0.9rem] lg:text-[1rem]'>
				{data?.ensName ||
					data.address.slice(0, 4) + '...' + data.address.slice(-4)}
			</div>
		</div>
	);
};

export default ChatHeader;
