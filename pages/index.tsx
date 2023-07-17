import React from 'react';
import type { ReactElement } from 'react';
import { Layout, ChatList } from '@/components';
import type { NextPageWithLayout } from './_app';

import { useConversations } from '@xmtp/react-sdk';
import { useAddress } from '@thirdweb-dev/react';

import { useEns } from '@/hooks';

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
