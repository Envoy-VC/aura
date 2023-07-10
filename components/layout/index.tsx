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
					<Sidebar />
					{children}
				</ConfigProvider>
			</ThirdwebProvider>
		</>
	);
};

export default Layout;
