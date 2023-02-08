import React, { useState, useCallback, useEffect, useRef } from "react"
import ARComponent from "../ARComponent"
import GUIComponent from "../GUIComponent"
import MenuHandler from "../Menu"

import './styles.css'

export const ModelContext = React.createContext();
export const GameStateContext = React.createContext();

export const plantStateEnum = {
    wilt: {
        id: -1,
        foodproduction: 2,
    },
    notpurchased: {
        id: 0,
        foodproduction: 0,
    },
    sprout: {
        id: 1,
        foodproduction: 5,
    },
    plant: {
        id: 2,
        foodproduction: 10,
    },
    bloom: {
        id: 3,
        foodproduction: 15,
    },
}

export function Game(props) {

    // ---------- STATE ----------
    
    const [food, setFood] = useState(1000);
    const foodRate = useRef(0);
    const [ammonium, setAmmonium] = useState(0);
    const [plantVisible, setPlantVisible] = useState(false);
    const [plantState, setPlantState] = useState(plantStateEnum.notpurchased);

    useEffect(() => {
        /*
        Currently only solution I know to fix rendering on state changes
        This is because state change causes a re-render of the component

        Dispatching the resize event fixes the canvas rendering,
        so it should be called after any state changes
        */
        window.dispatchEvent(new Event('resize'));
    }, [food, plantVisible, plantState])

    // ---------- GAME LOGIC ----------

    // add food every second
    useEffect(() => {
        setInterval(() => setFood( (old) => old + foodRate.current ), 1000);
    }, []);

    // update food production when plant changes
    useEffect(() => {
        foodRate.current = plantState.foodproduction;
    }, [plantState])

    // ---------- CALLBACKS ----------

    let bloomTimeout = null;

    const plantFound = useCallback(() => {
        clearTimeout(bloomTimeout);
        setPlantVisible(true);
    }, []);

    const plantLost = useCallback(() => {
        window.dispatchEvent(new Event('resize'));
        clearTimeout(bloomTimeout);
        bloomTimeout = setTimeout(() => setPlantVisible(false), 2000);
    }, []);

    // ---------- PROPS ----------

    const ARprops = {
        plantFound,
        plantLost,
    }

    const GUIprops = {
        food,
        plantVisible,
        ammonium,
        setFood,
        setPlantState,
    }

		
    // ---------- RENDER ----------

    return (
        <>
            <ModelContext.Provider value={{plantState}}>
                <ARComponent {...ARprops} />
            </ModelContext.Provider>

            <GUIComponent
                {...GUIprops}
            />

            <GameStateContext.Provider value={{food, ammonium, plantVisible, plantState, setFood, setAmmonium, setPlantVisible, setPlantState}}>
                <MenuHandler/>
            </GameStateContext.Provider>
					

        </>
    );
}
