import React from 'react';
import { Avatar, Button, Drawer } from 'antd';
import NavbarDrawer from './drawer';

import { PiListBold } from 'react-icons/pi';
import logo from '@/public/logo.png';

const Navbar = () => {
	const [open, setOpen] = React.useState<boolean>(false);

	const handleDrawerOpen = (state: boolean) => {
		setOpen(state);
	};

	return (
		<div className='flex flex-row justify-between p-4 border-2 sm:hidden'>
			<Button
				type='ghost'
				size='middle'
				className='p-[0px] animate-none'
				onClick={() => handleDrawerOpen(true)}
			>
				<PiListBold color='#666666' size={28} />
			</Button>
			<div className='w-8 h-8'>
				<Avatar src={logo.src} size={36} />
			</div>
			<Drawer
				title={null}
				placement='left'
				closable={true}
				onClose={() => handleDrawerOpen(false)}
				open={open}
				key='left'
			>
				<NavbarDrawer />
			</Drawer>
		</div>
	);
};

export default Navbar;
