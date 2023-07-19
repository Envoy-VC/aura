import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { ALCHEMY_API_KEY } from '@/utils';

interface IData {
	address: string;
	ensName: string;
	ensAvatar: string;
	resolver: ethers.providers.Resolver | null;
}

interface IError {
	message?: string;
}

const useEns = (address: string) => {
	const [data, setData] = useState<IData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<IError>();

	let provider = new ethers.providers.AlchemyProvider(
		'homestead',
		ALCHEMY_API_KEY
	);

	useEffect(() => {
		if (!address) {
			setIsLoading(false);
			setError({ message: 'No address provided' });
		}
		if (address) {
			setIsLoading(true);
			provider
				?.lookupAddress(address)
				.then(async (res) => {
					if (res) {
						let resolver = await provider?.getResolver(res);
						let avatar = await provider?.getAvatar(res);
						setData({
							address: address,
							ensName: res,
							ensAvatar: avatar || '',
							resolver: resolver || null,
						});
					}

					setIsLoading(false);
				})
				.catch((err) => {
					setError({ message: err.message });
					console.log(error);
					setIsLoading(false);
				});
		}
	}, [address]);

	return { data, isLoading, error };
};

export default useEns;
