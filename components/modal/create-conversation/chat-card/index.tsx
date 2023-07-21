import React from 'react';
import { Skeleton, Avatar, Button } from 'antd';
import { getLensProfile, getENSProfile } from '@/services/profile';
import { PiUserBold, PiTelegramLogoBold } from 'react-icons/pi';

import { ProfileDetailsType } from '@/types';

const ChatCard = ({ value }: { value: string }) => {
	const [profile, setProfile] = React.useState<ProfileDetailsType>({
		address: '',
	});
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	const getProfile = (profile: ProfileDetailsType) => {
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

	React.useEffect(() => {
		async function resolveProfiles(value: string) {
			try {
				setIsLoading(true);
				let ensProfile = await getENSProfile(value);
				let lensProfile = await getLensProfile(value);
				setProfile({
					address: value,
					domains: [ensProfile],
					socials: [lensProfile],
				});
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		resolveProfiles(value);
	}, [value]);

	return (
		<div
			className={`flex flex-row !items-center justify-between w-full gap-4 p-2 rounded-xl animate-all duration-200 ease-in-out select-none hover:bg-[#5a99ff2f]`}
		>
			<div className='flex flex-row items-center gap-2'>
				<div className='w-12 h-12 rounded-full'>
					{isLoading ? (
						<Skeleton.Avatar active={true} size={36} className='mt-[4px]' />
					) : (
						<Avatar
							size={{ xs: 32, sm: 32, md: 36, lg: 36, xl: 36, xxl: 36 }}
							src={
								getProfile(profile).avatar || (
									<PiUserBold size={32} color='#666666' />
								)
							}
							className='bg-[#f5f5f5] items-center mt-[4px]'
						/>
					)}
				</div>
				<p className={`font-semibold text-[1rem] !max-w-[200px]`}>
					{isLoading ? (
						<Skeleton
							active
							paragraph={{
								rows: 0,
								className: '!m-0 !p-0',
							}}
							title={{
								width: 200,
							}}
							className='!max-w-[50px]'
						/>
					) : (
						getProfile(profile).name ||
						profile?.address.slice(0, 6) + '...' + profile?.address.slice(-4)
					)}
				</p>
			</div>
			<div className='flex justify-end'>
				<Button type='ghost' size='middle' className='p-[0px] animate-none'>
					<PiTelegramLogoBold color='#666666' size={22} />
				</Button>
			</div>
		</div>
	);
};

export default ChatCard;
