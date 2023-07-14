import type { ReactElement } from 'react';
import { Layout, ChatList } from '@/components';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
	return (
		<div className='flex flex-row w-full'>
			<ChatList />
			<div className='hidden w-full border-2 md:flex'>content</div>
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
