import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';

import { ethers } from 'ethers';
import { ALCHEMY_API_KEY } from '@/utils';

interface Props {
	ethAddress?: string;
}

interface IData {
	ensName?: string;
	avatar?: string;
}

interface IError {
	message?: string;
}

const useEns = ({ ethAddress }: Props) => {
	const [data, setData] = useState<IData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<IError>();

	const address = useAddress();
	const ethAddr = ethAddress || address;

	let provider = new ethers.providers.AlchemyProvider(
		'homestead',
		ALCHEMY_API_KEY
	);

	useEffect(() => {
		if (!ethAddress || address) {
			setIsLoading(false);
			setError({ message: 'No address provided' });
		}
		if (ethAddress) {
			setIsLoading(true);
			provider
				?.lookupAddress(ethAddr!)
				.then(async (res) => {
					if (res) {
						let avatar = await provider?.getAvatar(res);
						setData({ ensName: res || '', avatar: avatar || '' });
					}

					setIsLoading(false);
				})
				.catch((err) => {
					setError({ message: err.message });
					console.log(error);
					setIsLoading(false);
				});
		}
	}, [ethAddress]);

	return { data, isLoading, error };
};

export default useEns;
