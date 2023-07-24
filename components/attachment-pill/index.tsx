import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useClient } from '@xmtp/react-sdk';
import {
	Attachment,
	RemoteAttachmentCodec,
} from '@xmtp/content-type-remote-attachment';

import { Image } from 'antd';

import { formatTimestamp } from '@/utils';

import type { DecodedMessage } from '@xmtp/react-sdk';

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
					className={`rounded-sm lg:rounded-md p-[3px] max-w-[300px] lg:max-w-[500px] flex items-center justify-center ${
						senderAddress === address ? 'bg-[#2176FF]' : 'bg-[#F8F8F8]'
					}`}
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
						/>
					) : error ? (
						'Error loading attachment'
					) : (
						'Loading attachment...'
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
