import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { ammoniumSilosPerPlot, ammoniumSiloTypeEnum, calculateAmmoniumStorage, costPerAmmoniumSilo, createAmmoniumSilo, GameStateContext, maintainAmmoniumSilo } from '../../Game';

import './styles.css';


export default function AmmoniumSiloMenu(props) {

    const purchaseAmmoniumSilo = (value) => {
        if(purchaseAmmoniumSiloDisabled(value)) return;
        if(value.setFoodValidated((old) => old - costPerAmmoniumSilo)) {
            createAmmoniumSilo(value.setAmmoniumSiloState);
        }
    }

    const purchaseAmmoniumSiloDisabled = (value) => {
        return value.food < costPerAmmoniumSilo || Object.keys(value.ammoniumSiloState).length >= ammoniumSilosPerPlot
    }

    const maintainAmmoniumSiloClicked = (ammoniumSilo, value) => {
        if(maintainAmmoniumSiloDisabled(ammoniumSilo, value)) return;
        value.setFoodValidated((old) => old - ammoniumSilo.state.upgradeCost);
        maintainAmmoniumSilo(ammoniumSilo.id, value.setAmmoniumSiloState)
    }

    const maintainAmmoniumSiloDisabled = (ammoniumSilo, value) => {
        if(ammoniumSilo.state.upgradeCost !== undefined && ammoniumSilo.state !== ammoniumSiloTypeEnum.safe) {
            return ammoniumSilo.state.upgradeCost > value.food;
        } else {
            return true;
        }
    }

    const getMaintenanceButton = (ammoniumSilo, value) => {
        if(ammoniumSilo.state.upgradeCost !== undefined && ammoniumSilo.state !== ammoniumSiloTypeEnum.safe) {
            return <button disabled={maintainAmmoniumSiloDisabled(ammoniumSilo, value)} onClick={() => maintainAmmoniumSiloClicked(ammoniumSilo, value)}>Maintenance ({ammoniumSilo.state.maintenanceCost})</button>
        } else {
            return "";
        }
    }

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='ammoniumsilo-menu-main'>
                    <div className='controls'>
                        <button onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>
                    <div>
                        <h3>Ammonium Silo Plot</h3>
                        <p>Silos: {Object.keys(value.ammoniumSiloState).length} / {ammoniumSilosPerPlot}</p>
                        <p>Extra Ammonium Capacity: {calculateAmmoniumStorage(value.ammoniumSiloState)} Ammonium</p>
                        {
                            Object.keys(value.ammoniumSiloState).length === 0 ?
                                <p>No ammonium silos have been placed.</p>
                                :
                                <div className='ammoniumsilo-grid'>
                                    {Object.values(value.ammoniumSiloState).map((ammoniumSilo, index) =>
                                        <div className='ammoniumsilo-elem' key={ammoniumSilo.id}>
                                            <p>{ammoniumSilo.state.name}</p>
                                            <img className='medium-icon' src={ammoniumSilo.state.imgURL}></img>
                                            {getMaintenanceButton(ammoniumSilo, value)}
                                        </div>
                                    )}
                                </div>
                        }

                        <p>
                            <button disabled={purchaseAmmoniumSiloDisabled(value)} onClick={() => purchaseAmmoniumSilo(value)}>Purchase Ammonium Silo ({costPerAmmoniumSilo} Food)</button>
                        </p>

                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
