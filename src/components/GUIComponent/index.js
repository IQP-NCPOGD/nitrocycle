import React, { useEffect, useState } from "react"

import { setActiveMenu, getActiveMenu, menus } from '../Menu/index';

import './styles.css'

export default function GUIComponent(props) {

    return (
        <div className="gui">

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
			<button onClick={ () => {
					console.log(menus);
					setActiveMenu(getActiveMenu() == menus.test ? menus.none : menus.test)
				}
			}> 
				modal
			</button>
            </div>

            <div className="node-buttons">
                {
                    props.bloomVisible ? <button className="bloom-button" onTouchEnd={() => props.setBloomPurchased((old)=>!old)}>Bloom</button> : ""
                }
            </div>

        </div>
    );
}
