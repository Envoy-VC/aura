import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useStorage } from '@thirdweb-dev/react';
import {
	AttachmentCodec,
	RemoteAttachmentCodec,
	Attachment,
	RemoteAttachment,
} from '@xmtp/content-type-remote-attachment';
import { Modal, Image, Progress, Button } from 'antd';
import { PiUploadDuotone, PiUploadBold, PiTrashBold } from 'react-icons/pi';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadAttachmentModal = ({ modalOpen, setModalOpen }: Props) => {
	const storage = useStorage();

	const [file, setFile] = React.useState<File>();
	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = React.useState<number>(0);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		accept: { 'image/*': [] },
		onDrop: async (acceptedFiles) => {
			let fileToUpload = acceptedFiles.at(0);
			if (fileToUpload) {
				setFile(fileToUpload);
				await uploadFile(fileToUpload);
			}
		},
	});

	const uploadFile = async (file: File) => {
		try {
			setIsUploading(true);
			let attachment: Attachment;
			let data = await file.arrayBuffer().then((res) => new Uint8Array(res));
			attachment = {
				filename: file.name,
				mimeType: file.type,
				data,
			};
			const encryptedEncoded = await RemoteAttachmentCodec.encodeEncrypted(
				attachment,
				new AttachmentCodec()
			);
			const uri = await storage?.upload(encryptedEncoded.payload, {
				uploadWithoutDirectory: true,
				alwaysUpload: false,
				onProgress: (progress) => {
					setUploadProgress(
						Math.floor(Number((progress.progress / progress.total) * 100))
					);
				},
			});
			let url = `https://ipfs.io/ipfs/${uri?.split('ipfs://').at(1)}`;

			const remoteAttachment: RemoteAttachment = {
				url: url,
				contentDigest: encryptedEncoded.digest,
				salt: encryptedEncoded.salt,
				nonce: encryptedEncoded.nonce,
				secret: encryptedEncoded.secret,
				scheme: 'https://',
				filename: attachment.filename,
				contentLength: attachment.data.byteLength,
			};

			console.log(remoteAttachment);
		} catch (error) {
			console.log(error);
		} finally {
			setIsUploading(false);
			setUploadProgress(0);
		}
	};

	return (
		<Modal
			title={
				<div className='flex flex-row justify-start gap-3 text-[1rem] font-bold text-[#1A1523]'>
					<PiUploadDuotone color='#2176FF' size={24} />
					Upload Attachment
				</div>
			}
			footer={
				<div className='flex justify-end'>
					<Button
						type='primary'
						size='middle'
						className='bg-[#2176FF] text-white text-[0.875rem]'
						disabled={isUploading || !acceptedFiles.length}
					>
						Done
					</Button>
				</div>
			}
			open={modalOpen}
			onCancel={() => {
				setModalOpen(false);
				setFile(undefined);
			}}
		>
			<div className='flex flex-col gap-4 mt-6'>
				<div
					{...getRootProps({
						className:
							'flex flex-col items-center p-6 border-2 rounded-md border-[#eeeeee] border-dashed bg-[#fafafa] text-[#000] hover:border-[#1677FF] transition duration-300 ease-in-out',
					})}
				>
					<input {...getInputProps()} />
					<PiUploadBold color='#1677FF' size={42} />
					<p className='mt-2'>Click or drag file to this area to upload</p>
				</div>
				{file !== undefined && (
					<div className='flex flex-row items-center w-full gap-2 p-1 border-2 border-[#ebebeb] rounded-md'>
						<div className='min-w-[108px] min-h-[64px]'>
							<Image
								src={URL.createObjectURL(file)}
								width={108}
								height={64}
								className='object-cover rounded-md'
								alt={file.name}
							/>
						</div>
						{isUploading ? (
							<Progress percent={uploadProgress} />
						) : (
							<div className='w-full'>{file.name}</div>
						)}
						<Button
							type='ghost'
							size='small'
							className='!p-[0px] !animate-none mr-3'
							disabled={isUploading}
							onClick={() => {
								setFile(undefined);
							}}
						>
							<PiTrashBold color='#666666' size={18} />
						</Button>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default UploadAttachmentModal;
