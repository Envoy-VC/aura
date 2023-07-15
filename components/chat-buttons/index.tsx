import React from 'react';
import { Button } from 'antd';

import { TbSquareRoundedPlusFilled, TbPhoto } from 'react-icons/tb';

const ChatButtons = () => {
	return (
		<div className='flex flex-row justify-start items-center gap-0'>
			<Button type='ghost' size='middle' className='p-[0px] animate-none'>
				<TbSquareRoundedPlusFilled color='#939393' size={32} />
			</Button>
			<Button type='ghost' size='middle' className='p-[0px] animate-none'>
				<TbPhoto color='#939393' size={30} />
			</Button>
		</div>
	);
};

export default ChatButtons;
