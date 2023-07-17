import React from 'react';
import type { ReactElement } from 'react';
import { Layout, ChatList } from '@/components';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
	return (
		<div className='flex flex-row w-full'>
			<ChatList />
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
