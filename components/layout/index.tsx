import React from 'react';
import { ConfigProvider } from 'antd';
import Sidebar from '../sidebar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
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
		</>
	);
};

export default Layout;
