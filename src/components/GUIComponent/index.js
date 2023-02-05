import React, { useEffect, useState } from "react"

import './styles.css'

export default function GUIComponent(props) {

    const [food, setFood] = useState(0);
    const [bloomVisible, setBloomVisible] = useState(false);

    useEffect(() => {
        props.onMount({food, setFood, bloomVisible, setBloomVisible});
    }, [props.onMount, food, bloomVisible]);

    console.log("Render GUI");
    return (
        <div className="gui-controls">

            <div className="stat-display">
                <div className="stat">
                    Food: {food}
                </div>
            </div>

            <div className="buttons">
                <button
                    className="say-hi-button"
                    onClick={() => setFood((old)=>old+1)}>
                    Button
                </button>
            </div>

            <div className="node-buttons">
                {bloomVisible ? <button className="bloom-button">
                    Bloom
                </button> : ""}
            </div>

        </div>
    );
}