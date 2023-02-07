import React, { useEffect, useState } from "react"

import './styles.css'

export const menus = {
	none: (<></>),
	test: (<MenuComponent />),
	encyclopedia: (<MenuComponent />)
}
export let setActiveMenu = undefined;
export let getActiveMenu = undefined;

export function MenuHandler(props) { 
	const [activeMenu, sam] = useState(menus.none);
	setActiveMenu = (menu) => {
		console.log('setting active menu to: ', menu);
	sam(menu);
	};
	getActiveMenu = () => activeMenu;

	return <div className="menu-handler">
		{ activeMenu }
	</div>;
}

export function MenuComponent(props) {

    return (
        <div className="menu">
					<span>menu</span>
        </div>
    );
}

export function EncyclopediaMenu(props) {

    return (
        <MenuComponent />
		);
}



export default MenuHandler; 
