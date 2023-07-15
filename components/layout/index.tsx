import React from 'react';
import { ConfigProvider } from 'antd';
import {
	ThirdwebProvider,
	metamaskWallet,
	trustWallet,
	walletConnect,
} from '@thirdweb-dev/react';

import Sidebar from '../sidebar';

import { WALLET_CONNECT_PROJECT_ID } from '@/utils';

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
						projectId: WALLET_CONNECT_PROJECT_ID,
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
