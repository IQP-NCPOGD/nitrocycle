import React, { useState, useCallback, memo } from "react"
import ARComponent from "../ARComponent"
import GUIComponent from "../GUIComponent"

import './styles.css'

export default function Game(props) {
    let food = null;
    let bloomVisible = null;
    let bloomPurchased = null;

    let setFood = null;
    let setBloomVisible = null;
    let setBloomPurchased = null;

    let bloomTimeout = null;

    const onARMount = (dataFromAR) => {
        bloomPurchased = dataFromAR.bloomPurchased;
        setBloomPurchased = dataFromAR.setBloomPurchased;
    }

    const onGUIMount = (dataFromGui) => {
        food = dataFromGui.food;
        setFood = dataFromGui.setFood;

        bloomVisible = dataFromGui.setBloomVisible;
        setBloomVisible = dataFromGui.setBloomVisible;
    }

    //

    const plantFound = useCallback(() => {
        clearTimeout(bloomTimeout);
        setBloomVisible(true);
    }, []);

    const plantLost = useCallback(() => {
        clearTimeout(bloomTimeout);
        bloomTimeout = setTimeout(() => setBloomVisible(false), 3000);
    }, []);

    //

    const ARprops = {
        onMount: onARMount,
        plantFound,
        plantLost,
    }

    const GUIprops = {
        onMount: onGUIMount,
        setBloomPurchased,
    }

    //

    const ARComponentMemo = memo((ARprops) => <ARComponent {...ARprops} />)

    console.log("Render Game")

    return (
        <>
            <ARComponentMemo {...ARprops} />

            <GUIComponent
                {...GUIprops}
            />
        </>
    );
}