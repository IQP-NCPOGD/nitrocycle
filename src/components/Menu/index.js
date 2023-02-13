import React, { useEffect, useState } from "react"
import FarmersLog from "./FarmersLog/FarmersLog";
import Shop from "./Shop";
import Trivia from "./Trivia/Trivia";
import PlantMenu from "./PlantMenu";

import './menu.css'
import FoodSiloMenu from "./FoodSiloMenu";
import AmmoniumSiloMenu from "./AmmoniumSiloMenu";
import FixatorMenu from "./FixatorMenu";


export const menus = {
	none: (<></>),
	test: (<MenuComponent />),
	log: (<MenuComponent />),
	farmersLog: (<FarmersLog></FarmersLog>),
	shop: (<Shop></Shop>),
	trivia: (<Trivia></Trivia>),
	plantMenu: (<PlantMenu></PlantMenu>),
	foodSiloMenu:(<FoodSiloMenu></FoodSiloMenu>),
	ammoniumSiloMenu:(<AmmoniumSiloMenu></AmmoniumSiloMenu>),
	fixatorMenu: (<FixatorMenu></FixatorMenu>),
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

	let zIndex = getActiveMenu() == menus.none ? 5 : 15;
	let backgroundColor = getActiveMenu() == menus.none ? undefined : "rgba(0,0,0,0.5)";
	return <div className="menu-handler" style={{zIndex, backgroundColor}}>
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

export function LogMenu(props) {

    return (
        <MenuComponent />
		);
}



export default MenuHandler; 
