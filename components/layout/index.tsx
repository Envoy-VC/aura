import React from 'react';
import { ConfigProvider } from 'antd';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import Sidebar from '../sidebar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<ThirdwebProvider>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#2176FF',
						},
					}}
				>
					<div className='flex flex-row'>
						<Sidebar />
						{children}
					</div>
				</ConfigProvider>
			</ThirdwebProvider>
		</>
	);
};

export default Layout;
