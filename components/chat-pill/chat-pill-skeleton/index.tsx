import { Skeleton } from 'antd';

const SkeletonChatPill = ({ index }: { index: number }) => {
	let sender = index % 2 === 0;
	return (
		<div
			className={`flex flex-col ${
				sender ? 'self-end items-end' : 'self-start items-start'
			}`}
		>
			<div
				className={`flex flex-col gap-1 ${
					sender ? 'items-end' : 'items-start'
				}`}
			>
				<div className='rounded-xl lg:rounded-xl py-1 lg:py-2 font-medium text-[1rem] sm:text-[1rem] px-2 md:px-3 max-w-[300px] lg:max-w-[500px] bg-[#F8F8F8] w-fit'>
					<Skeleton
						active
						paragraph={{
							rows: Math.floor(Math.random() * 2),
							className: '!p-0 !m-2',
						}}
						title={{
							width: Math.floor(Math.random() * 300) + 100,
						}}
						className='!max-w-[50px]'
					/>
				</div>
			</div>
		</div>
	);
};

export default SkeletonChatPill;
