import { ethers } from 'ethers';
import { ALCHEMY_API_KEY } from '@/utils';
import { ProfileDetailsType, IDomain, ISocials } from '@/types';

let provider = new ethers.providers.AlchemyProvider(
	'homestead',
	ALCHEMY_API_KEY
);

export const getENSProfile = async (address: string) => {
	let data: IDomain;

	let ensName = await provider?.lookupAddress(address);
	if (ensName !== null) {
		let avatar = await provider?.getAvatar(ensName);
		data = {
			dappName: 'ens',
			name: ensName,
			avatar: avatar || '',
			resolvedAddress: address,
		};
		return data;
	} else {
		data = {
			dappName: 'ens',
			name: null,
			avatar: null,
			resolvedAddress: '',
		};
		return data;
	}
};

const lensQuery = (address: string) => {
	let query = `query getProfile {
  defaultProfile(request: {
    ethereumAddress:"${address}"
  }) {
    handle
	ownedBy
    picture {
      ... on NftImage {
        uri
      }
      ... on MediaSet {
        original {
          url
        }
        optimized {
          url
        }
      }
    }
  }
}`;
	return query;
};

export const getLensProfile = async (address: string) => {
	let data: ISocials;
	const query = lensQuery(address);

	const res = await fetch('https://api.lens.dev/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: query, variables: {} }),
	}).then((res) => res.json());

	if (res?.data?.defaultProfile !== null) {
		let picture = res?.data?.defaultProfile?.picture;
		data = {
			dappName: 'lens',
			name: res?.data?.defaultProfile?.handle || '',
			avatar: picture?.original?.url || picture?.optimized?.url || '',
			ownedBy: address,
		};
		return data;
	} else {
		data = {
			dappName: 'lens',
			name: null,
			avatar: null,
			ownedBy: '',
		};
		return data;
	}
};

export const getProfile = (profiles: ProfileDetailsType[], address: string) => {
	let profile = profiles.find((profile) => profile.address === address);
	let ensDetails = profile?.domains?.find(
		(domain) => domain.dappName === 'ens'
	);
	let lensProfile = profile?.socials?.find(
		(social) => social.dappName === 'lens'
	);

	const name = ensDetails?.name || lensProfile?.name;
	const avatar = ensDetails?.avatar || lensProfile?.avatar;

	return { name, avatar };
};

export const resolveLensHandle = async (handle: string) => {
	const query = `
		query getProfile {
			profile(request: { handle: "${handle}" }) {
				ownedBy
			}
		}`;

	const res = await fetch('https://api.lens.dev/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: query, variables: {} }),
	}).then((res) => res.json());

	if (res?.data?.profile !== null) {
		return res?.data?.profile?.ownedBy;
	} else {
		return null;
	}
};

export const resolveENSName = async (name: string) => {
	let address = await provider?.resolveName(name);
	return address;
};
