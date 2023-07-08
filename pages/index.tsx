import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
	return <p></p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
