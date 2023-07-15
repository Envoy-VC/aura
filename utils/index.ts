export const formatTimestamp = (timestamp: number) => {
	// convert timestamp in seconds to HH:MM AAM/PM format 12 hour
	const date = new Date(timestamp * 1000);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
