import React, { useState, useCallback } from "react"
import ARComponent from "../ARComponent"
import GUIComponent from "../GUIComponent"

import './styles.css'

export const ModelContext = React.createContext();

export function Game(props) {
    const [food, setFood] = useState(0);
    const [bloomVisible, setBloomVisible] = useState(false);
    const [bloomPurchased, setBloomPurchased] = useState(false);

    let bloomTimeout = null;

    //

    const plantFound = useCallback(() => {
        clearTimeout(bloomTimeout);
        setBloomVisible(true);
    }, []);

    const plantLost = useCallback(() => {
        clearTimeout(bloomTimeout);
        bloomTimeout = setTimeout(() => setBloomVisible(false), 2000);
    }, []);

    //

    const ARprops = {
        plantFound,
        plantLost,
    }

    const GUIprops = {
        food,
        bloomVisible,
        setFood,
        setBloomPurchased,
    }

    //

    console.log("Render Game")

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