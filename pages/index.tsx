import React from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import NestedLayout from '@/components/layout/nested-layout';
import { ChatContext } from '@/components/layout/nested-layout';

import { Layout, ChatList } from '@/components';
import { ChatArea } from '@/sections';

const Page: NextPageWithLayout = () => {
	const { activeChat } = React.useContext(ChatContext);
	return (
		<div className='flex flex-row w-full'>
			<div
				className={`${
					activeChat !== null ? 'hidden md:flex' : ''
				} w-full sm:w-fit`}
			>
				<ChatList />
			</div>
			{activeChat && <ChatArea conversation={activeChat} />}
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Page;
