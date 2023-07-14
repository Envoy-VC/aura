import React from 'react';
import { Modal, Button, Upload, Image, Input, Tooltip } from 'antd';
import { useStorage } from '@thirdweb-dev/react';

import { PiUserPlusDuotone, PiUserDuotone } from 'react-icons/pi';
import {
	LoadingOutlined,
	PlusOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';

import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccountModal = ({ modalOpen, setModalOpen }: Props) => {
	const storage = useStorage();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [imageUrl, setImageUrl] = React.useState<string>('');

	const beforeUpload = (file: RcFile) => {
		const isImageType = file.type.startsWith('image/');
		if (!isImageType) {
			alert('You can only upload Image Files!');
		}
		return isImageType;
	};

	const handleChange: UploadProps['onChange'] = async (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			const uri = await storage?.upload(info.file.originFileObj, {
				uploadWithoutDirectory: true,
				alwaysUpload: false,
			});
			console.log(uri);
			setImageUrl('https://ipfs.io/ipfs/' + uri!?.slice(7));
			setLoading(false);
			return;
		}
		if (info.file.status === 'done') {
			setLoading(false);
		}
	};

	const handleModalState = (state: boolean) => {
		setLoading(false);
		setImageUrl('');
		setModalOpen(state);
	};

	return (
		<Modal
			title={
				<>
					<div className='flex flex-row items-center justify-start gap-2'>
						<PiUserPlusDuotone color='#666666' size={24} />
						Create Account
					</div>
				</>
			}
			open={modalOpen}
			onCancel={() => handleModalState(false)}
			footer={
				<>
					<Button
						type='default'
						className='font-medium text-white bg-[#2176FF] hover:!text-white'
						onClick={() => setModalOpen(true)}
					>
						Create Account
					</Button>
				</>
			}
		>
			<div className='flex flex-col items-center justify-center gap-6 mx-auto my-12 w-fit'>
				<div className='mx-auto'>
					<Upload
						name='avatar'
						listType='picture-circle'
						showUploadList={false}
						action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{imageUrl ? (
							<Image src={imageUrl} alt='avatar' className='rounded-full' />
						) : (
							<div>
								{loading ? <LoadingOutlined /> : <PlusOutlined />}
								<div style={{ marginTop: 8 }}>Upload</div>
							</div>
						)}
					</Upload>
				</div>
				<Input
					placeholder='Display Name'
					prefix={<PiUserDuotone className='site-form-item-icon' />}
					suffix={
						<Tooltip title='Can be changed later'>
							<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
						</Tooltip>
					}
				/>
			</div>
		</Modal>
	);
};

export default CreateAccountModal;