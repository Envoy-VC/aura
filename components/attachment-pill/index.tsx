import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useClient } from '@xmtp/react-sdk';
import {
	Attachment,
	RemoteAttachmentCodec,
} from '@xmtp/content-type-remote-attachment';

import { Image, Skeleton, Space } from 'antd';

import { formatTimestamp } from '@/utils';

import {
	DownloadOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from '@ant-design/icons';

import type { DecodedMessage } from '@xmtp/react-sdk';

interface ToolbarButtonProps {
	icon: React.ReactNode;
	onClick: () => void;
}

const AttachmentPill = ({ content, sent, senderAddress }: DecodedMessage) => {
	const address = useAddress();
	const { client } = useClient();
	const [attachment, setAttachment] = React.useState<Attachment>();
	const [error, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		const loadAttachment = async () => {
			const res: Attachment = await RemoteAttachmentCodec.load(content, {
				codecFor(ContentTypeRemoteAttachment) {
					return client!.codecFor(ContentTypeRemoteAttachment);
				},
			});
			setAttachment(res);
		};
		try {
			loadAttachment();
		} catch (error) {
			console.log(error);
			setError(true);
		}
	}, []);

	const handleDownload = () => {
		if (!attachment) return;
		let url = URL.createObjectURL(
			new Blob([attachment.data], { type: attachment.mimeType })
		);
		const link = document.createElement('a');
		link.href = url;
		link.download = attachment.filename;
		document.body.appendChild(link);
		link.click();
		URL.revokeObjectURL(url);
		link.remove();
	};

	return (
		<div
			className={`flex flex-col ${
				senderAddress === address
					? 'self-end items-end'
					: 'self-start items-start'
			}`}
		>
			<div
				className={`flex flex-col gap-1 ${
					senderAddress === address ? 'items-end' : 'items-start'
				}`}
			>
				<div
					className={`rounded-sm lg:rounded-md max-w-[300px] lg:max-w-[500px] flex items-center justify-center`}
				>
					{attachment !== undefined ? (
						<Image
							src={URL.createObjectURL(
								new Blob([attachment.data], {
									type: attachment.mimeType,
								})
							)}
							alt={attachment.filename}
							className='!w-full !h-full object-cover rounded-md'
							preview={{
								toolbarRender: (
									_,
									{
										transform: { scale },
										actions: {
											onFlipY,
											onFlipX,
											onRotateLeft,
											onRotateRight,
											onZoomOut,
											onZoomIn,
										},
									}
								) => (
									<Space size={12} className='gap-4 toolbar-wrapper'>
										<DownloadOutlined
											onClick={handleDownload}
											style={{ fontSize: 20}}
										/>
										<SwapOutlined
											rotate={90}
											onClick={onFlipY}
											style={{ fontSize: 20 }}
										/>
										<SwapOutlined onClick={onFlipX} style={{ fontSize: 20 }} />
										<RotateLeftOutlined
											onClick={onRotateLeft}
											style={{ fontSize: 20 }}
										/>
										<RotateRightOutlined
											onClick={onRotateRight}
											style={{ fontSize: 20 }}
										/>
										<ZoomOutOutlined
											disabled={scale === 1}
											onClick={onZoomOut}
											style={{ fontSize: 20 }}
										/>
										<ZoomInOutlined
											disabled={scale === 50}
											onClick={onZoomIn}
											style={{ fontSize: 20 }}
										/>
									</Space>
								),
							}}
						/>
					) : error ? (
						'Error loading attachment'
					) : (
						<Skeleton.Image
							active={true}
							className='min-w-[300px] lg:min-w-[400px] min-h-[200px] lg:min-h-[300px]'
						/>
					)}
				</div>
			</div>
			<div className={`flex mt-[1px] items-center text-[10px] text-[#666666] `}>
				<div className='mx-[4px] font-medium'>{formatTimestamp(sent)}</div>
			</div>
		</div>
	);
};

export default AttachmentPill;
