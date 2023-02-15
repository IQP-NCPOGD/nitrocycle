import React, { useEffect, useState } from "react"
import { calculateAmmoniumEmergency } from "../Game";

import { setActiveMenu, getActiveMenu, menus } from '../Menu';

import './styles.css'

export default function GUIComponent(props) {

    return (
        <div className="gui">

            <div className="stat-display top-left">
                <div className="stat" onClick={() => props.setStatsExtended((old) => !old)}>
                    Food: {Math.round((props.food + Number.EPSILON) * 100) / 100} / {props.maxFood} <span style={{ float: 'right' }}> {props.statsExtended ? "⬇️" : "⬆️"}</span>
                </div>
                {
                    props.statsExtended ?
                        <>
                            <div className="stat">
                                Ammonium: {Math.round((props.ammonium + Number.EPSILON) * 100) / 100} / {props.maxAmmonium}
                            </div>
                            <div className="stat">
                                Nitrogen Runoff: {Math.round((props.maxNitrogenRunoff + Number.EPSILON) * 100) / 100} / {props.maxNitrogenRunoff}
                            </div>
                        </>
                        :
                        ""
                }
            </div>

            <div className="utility-buttons top-right">
                <div className="utility-button" onClick={() => setActiveMenu(menus.farmersLog)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 1l-5 5v11l5-4.5V1zM1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5V6c-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6zm22 13.5V6c-.6-.45-1.25-.75-2-1v13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5v2c1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5v-1.1z" /></svg>
                </div>
                <div className="utility-button" onClick={() => setActiveMenu(menus.shop)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                </div>
                <div className="utility-button" onClick={() => setActiveMenu(menus.trivia)}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M4,6H2v14c0,1.1,0.9,2,2,2h14v-2H4V6z" /><path d="M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M14.01,15 c-0.59,0-1.05-0.47-1.05-1.05c0-0.59,0.47-1.04,1.05-1.04c0.59,0,1.04,0.45,1.04,1.04C15.04,14.53,14.6,15,14.01,15z M16.51,8.83 c-0.63,0.93-1.23,1.21-1.56,1.81c-0.13,0.24-0.18,0.4-0.18,1.18h-1.52c0-0.41-0.06-1.08,0.26-1.65c0.41-0.73,1.18-1.16,1.63-1.8 c0.48-0.68,0.21-1.94-1.14-1.94c-0.88,0-1.32,0.67-1.5,1.23l-1.37-0.57C11.51,5.96,12.52,5,13.99,5c1.23,0,2.08,0.56,2.51,1.26 C16.87,6.87,17.08,7.99,16.51,8.83z" /></g></g></svg>
                </div>
                <div className="utility-button" onClick={() => setActiveMenu(menus.skillTree)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z"/></svg>
                </div>
                {
                    //setActiveMenu(getActiveMenu() == menus.encyclopedia ? menus.none : menus.encyclopedia)
                }
            </div>

            <div className="node-buttons bottom-right">
                {
                    props.plantVisible ? <img src="data/images/plant.png" onClick={() => setActiveMenu(menus.plantMenu)}></img> : ""
                }
                {
                    props.foodSiloVisible ? <img src="data/images/food-silo.png" onClick={() => setActiveMenu(menus.foodSiloMenu)}></img> : ""
                }
                {
                    props.ammoniumSiloVisible ? <img src="data/images/ammonium-silo.png" onClick={() => setActiveMenu(menus.ammoniumSiloMenu)}></img> : ""
                }
                {
                    props.fixatorVisible ? <img src="data/images/nitrogen-fixator.png" onClick={() => setActiveMenu(menus.fixatorMenu)}></img> : ""
                }
            </div>

            <div className="node-buttons bottom-left warning-button">
                {calculateAmmoniumEmergency(props.ammoniumSiloState) ? <img src="data/images/exclamation.png" onClick={() => window.alert("Your Ammonium Silos need maintenance immediately")}></img> : ""}
            </div>

        </div>
    );
}
