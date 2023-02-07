import React, { useState, useCallback, useEffect } from "react"
import ARComponent from "../ARComponent"
import GUIComponent from "../GUIComponent"

import './styles.css'

export const ModelContext = React.createContext();

export function Game(props) {

    // ---------- STATE ----------
    
    const [food, setFood] = useState(1000);
    const [ammonium, setAmmonium] = useState(0);
    const [bloomVisible, setBloomVisible] = useState(false);
    const [bloomPurchased, setBloomPurchased] = useState(true);

    useEffect(() => {
        /*
        Currently only solution I know to fix rendering on state changes
        This is because state change causes a re-render of the component

        Dispatching the resize event fixes the canvas rendering,
        so it should be called after any state changes
        */
        window.dispatchEvent(new Event('resize')); 
    }, [food, bloomVisible, bloomPurchased])

    // ---------- CALLBACKS ----------

    let bloomTimeout = null;

    const plantFound = useCallback(() => {
        console.log("Marker Found");
        clearTimeout(bloomTimeout);
        setBloomVisible(true);
    }, []);

    const plantLost = useCallback(() => {
        console.log("Marker Lost");
        clearTimeout(bloomTimeout);
        bloomTimeout = setTimeout(() => setBloomVisible(false), 2000);
    }, []);

    // ---------- PROPS ----------

    const ARprops = {
        plantFound,
        plantLost,
    }

    const GUIprops = {
        food,
        bloomVisible,
        ammonium,
        setFood,
        setBloomPurchased,
    }

    // ---------- RENDER ----------

    return (
        <>
            <ModelContext.Provider value={{bloomPurchased}}>
                <ARComponent {...ARprops} />
            </ModelContext.Provider>

            <GUIComponent
                {...GUIprops}
            />
        </>
    );
}