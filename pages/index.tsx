import type { ReactElement } from 'react';
import { Layout, ChatList } from '@/components';
import type { NextPageWithLayout } from './_app';

import { ChatArea } from '@/sections';

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
