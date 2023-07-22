import React from 'react';
import { useStartConversation, useCanMessage } from '@xmtp/react-sdk';
import { Skeleton, Avatar, Button, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getLensProfile, getENSProfile } from '@/services/profile';
import { ChatContext } from '@/components/layout/nested-layout';

import { PiUserBold, PiTelegramLogoBold } from 'react-icons/pi';
import { ProfileDetailsType } from '@/types';

interface Props {
	value: string;
}

const ChatCard = ({ value }: Props) => {
	const { conversations } = React.useContext(ChatContext);
	const { startConversation } = useStartConversation();
	const { canMessage } = useCanMessage();

	const [profile, setProfile] = React.useState<ProfileDetailsType>({
		address: '',
	});
	const [message, setMessage] = React.useState<string>();
	const [isSending, setIsSending] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>();
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
				setError('');
				let ensProfile = await getENSProfile(value);
				let lensProfile = await getLensProfile(value);
				setProfile({
					address: value,
					domains: [ensProfile],
					socials: [lensProfile],
				});
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
		resolveProfiles(value);
	}, [value]);

	const isExistingConversation = (address: string) => {
		let chat = conversations.filter(
			(conversation) => conversation?.peerAddress === address
		);

		if (chat.length === 0) return false;
		else {
			setError('Conversation already exists');
			return true;
		}
	};

	const checkCanMessage = async () => {
		let res = await canMessage(value);
		if (!res) {
			setError(
				`${
					getProfile(profile)?.name ||
					value.slice(0, 4) + '...' + value.slice(-4)
				} is not on XMTP Network`
			);
		}
		return res;
	};

	const handleStartConversation = async () => {
		try {
			setIsSending(true);
			const existingConversation = isExistingConversation(value);
			if (existingConversation) return;
			const canMessage = await checkCanMessage();
			if (!canMessage) return;
			if (!message) {
				setError('Message cannot be empty');
				return;
			}
			const res = await startConversation(value, message);
		} catch (error) {
			setError(String(error));
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div>
			<div
				className={`flex flex-row !items-center justify-between w-full gap-4 p-2 rounded-t-xl animate-all duration-200 ease-in-out select-none hover:bg-[#5a99ff2f] border-[1px] border-[#D9D9D9]`}
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
			</div>
			<div>
				{isLoading ? (
					<div className='rounded-b-[12px] border-x-[1px] border-b-[1px] border-[#D9D9D9] py-2 text-transparent'>
						a
					</div>
				) : (
					<Input
						placeholder='Send Message...'
						bordered={true}
						style={{
							borderTopLeftRadius: '0px',
							borderTopRightRadius: '0px',
							borderBottomLeftRadius: '12px',
							borderBottomRightRadius: '12px',
							borderTop: '0px',
							outline: 'none',
						}}
						suffix={
							<Button
								type='ghost'
								size='middle'
								className='px-0 animate-none'
								onClick={handleStartConversation}
								disabled={isSending}
							>
								{isSending ? (
									<Spin
										indicator={
											<LoadingOutlined style={{ fontSize: 24 }} spin />
										}
									/>
								) : (
									<PiTelegramLogoBold color='#666666' size={22} />
								)}
							</Button>
						}
						onChange={(e) => setMessage(e.target.value)}
					/>
				)}
			</div>
			<div className='mt-2 text-[#FF4D4F] text-[0.95rem]'>{error}</div>
		</div>
	);
};

export default ChatCard;
