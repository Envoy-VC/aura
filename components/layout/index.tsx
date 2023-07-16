import React from 'react';
import { ConfigProvider } from 'antd';
import {
	ThirdwebProvider,
	metamaskWallet,
	trustWallet,
	walletConnect,
	useSigner,
	useAddress,
} from '@thirdweb-dev/react';

import { XMTPProvider, useClient } from '@xmtp/react-sdk';

import { Sidebar } from '@/components';

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
					<XMTPProvider>
						<div className='flex flex-row'>
							<Sidebar />
							{children}
						</div>
					</XMTPProvider>
				</ConfigProvider>
			</ThirdwebProvider>
		</>
	);
};

export default Layout;
