import React, { useEffect, useState } from "react"

import './styles.css'

export default function GUIComponent(props) {

    return (
        <div className="gui-controls">

            <div className="stat-display">
                <div className="stat">
                    Food: {props.food}
                </div>
            </div>

            <div className="buttons">
                <button
                    className="say-hi-button"
                    onClick={() => props.setFood(props.food + 1)}>
                    Button
                </button>
            </div>

            <div className="node-buttons">
                {
                    props.bloomVisible ? <button className="bloom-button" onClick={() => props.setBloomPurchased((old)=>!old)}>Bloom</button> : ""
                }
            </div>

        </div>
    );
}