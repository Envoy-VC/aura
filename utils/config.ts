type EnvironmentType = 'production' | 'dev' | 'local';

export const WALLET_CONNECT_PROJECT_ID =
	process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

export const XMTP_ENVIRONMENT: EnvironmentType =
	(process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT as EnvironmentType) || 'production';
