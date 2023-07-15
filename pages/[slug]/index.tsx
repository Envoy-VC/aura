import type { ReactElement } from 'react';
import { Layout, ChatList } from '@/components';
import type { NextPageWithLayout } from '../_app';

import { ChatArea } from '@/sections';

const Chat: NextPageWithLayout = () => {
	return (
		<div className='flex flex-row w-full'>
			<ChatArea />
		</div>
	);
};

Chat.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Chat;
