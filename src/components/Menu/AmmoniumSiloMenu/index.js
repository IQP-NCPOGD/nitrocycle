import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { ammoniumSiloLevel, ammoniumSilosPerPlot, ammoniumSiloTypeEnum, calculateAmmoniumStorage, costPerAmmoniumSilo, createAmmoniumSilo, GameStateContext, maintainAmmoniumSilo } from '../../Game';

import '../menu.css';


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
        value.setFoodValidated((old) => old - ammoniumSilo.state.maintenanceCost);
        maintainAmmoniumSilo(ammoniumSilo.id, value.setAmmoniumSiloState)
    }

    const maintainAmmoniumSiloDisabled = (ammoniumSilo, value) => {
        if(ammoniumSilo.state.maintenanceCost !== undefined && ammoniumSilo.state !== ammoniumSiloTypeEnum.safe) {
            return ammoniumSilo.state.maintenanceCost > value.food;
        } else {
            return true;
        }
    }

    const getMaintenanceButton = (ammoniumSilo, value) => {
        if(ammoniumSilo.state.maintenanceCost !== undefined && ammoniumSilo.state !== ammoniumSiloTypeEnum.safe) {
            return <button disabled={maintainAmmoniumSiloDisabled(ammoniumSilo, value)} onClick={() => maintainAmmoniumSiloClicked(ammoniumSilo, value)}>Maintenance ({ammoniumSilo.state.maintenanceCost})</button>
        } else {
            return "";
        }
    }

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='menu'>
                        <h2>Ammonium Silo Plot</h2>
                        <p>Silos: {Object.keys(value.ammoniumSiloState).length} / {ammoniumSilosPerPlot}</p>
                        <p>Extra Ammonium Capacity: {calculateAmmoniumStorage(value.ammoniumSiloState)} Ammonium</p>
                        {
                            Object.keys(value.ammoniumSiloState).length === 0 ?
                                <p>No ammonium silos have been placed.</p>
                                :
                                <div className='menu-grid'>
                                    {Object.values(value.ammoniumSiloState).map((ammoniumSilo, index) =>
                                        <div className='grid-item' key={ammoniumSilo.id}>
                                            <p>{ammoniumSilo.state.name}</p>
                                            <img className='icon big' src={ammoniumSilo.state.imgURL}></img>
                                            {getMaintenanceButton(ammoniumSilo, value)}
                                        </div>
                                    )}
                                </div>
                        }
                    <div className='controls'>
                      {
                        value.foodSecurityLevel < ammoniumSiloLevel ?
                        <button disabled>Food Security Level {ammoniumSiloLevel} Required</button>
                        :
                        <button disabled={purchaseAmmoniumSiloDisabled(value)} onClick={() => purchaseAmmoniumSilo(value)}>Purchase Ammonium Silo ({costPerAmmoniumSilo} Food)</button>
                        }
                      <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
