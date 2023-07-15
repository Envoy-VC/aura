import React from 'react';
import { ConfigProvider } from 'antd';
import {
	ThirdwebProvider,
	metamaskWallet,
	trustWallet,
	walletConnect,
} from '@thirdweb-dev/react';

import Sidebar from '../sidebar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<ThirdwebProvider
				supportedWallets={[
					metamaskWallet(),
					trustWallet(),
					walletConnect({
						projectId: '4a57bdcd1d5c5c336bc5908073b97e00',
						qrModalOptions: {
							themeMode: 'light',
						},
					}),
				]}
				theme='light'
			>
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
