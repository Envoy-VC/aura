export const WALLET_CONNECT_PROJECT_ID =
	process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

export const formatTimestamp = (date: Date) => {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const getMessageTime = (timestamp: number) => {
	const now = new Date().getTime() / 1000;
	const seconds = Math.floor(now - timestamp);
	const intervals = [
		{ label: 'y', seconds: 31536000 },
		{ label: 'mo', seconds: 2592000 },
		{ label: 'w', seconds: 604800 },
		{ label: 'd', seconds: 86400 },
		{ label: 'h', seconds: 3600 },
		{ label: 'min', seconds: 60 },
		{ label: 's', seconds: 1 },
	];
	for (let i = 0; i < intervals.length; i++) {
		const interval = intervals[i];
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			return `${count}${interval.label} ago`;
		}
	}
};
