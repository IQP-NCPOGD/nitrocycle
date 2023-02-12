import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { calculateFoodPerMinute, costPerPlant, createPlant, fertilizePlant, GameStateContext, plantsPerPlot, plantTypeEnum } from '../../Game';

import './styles.css';


export default function PlantMenu(props) {

    const purchasePlant = (value) => {
        if(purchasePlantDisabled(value)) return;
        if(value.setFoodValidated((old) => old - costPerPlant)) {
            createPlant(value.setPlantState);
        }
    }

    const purchasePlantDisabled = (value) => {
        return value.food < costPerPlant || Object.keys(value.plantState).length >= plantsPerPlot
    }

    const fertilizePlantClicked = (plant, value) => {
        if(fertilizePlantDisabled(plant, value)) return;
        value.setAmmoniumValidated((old) => old - plant.state.upgradeCost);
        fertilizePlant(plant.id, value.setPlantState)
    }

    const fertilizePlantDisabled = (plant, value) => {
        if(plant.state.upgradeCost !== undefined) {
            return plant.state.upgradeCost > value.ammonium;
        } else {
            return true;
        }
    }

    const getFertilizeButton = (plant, value) => {
        if(plant.state.upgradeCost !== undefined) {
            return <button disabled={fertilizePlantDisabled(plant, value)} onClick={() => fertilizePlantClicked(plant, value)}>Fertilize ({plant.state.upgradeCost})</button>
        } else {
            return "";
        }
    }

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='plant-menu-main'>
                    <div className='controls'>
                        <button onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>
                    <div>
                        <h3>Plant Plot</h3>
                        <p>Plants: {Object.keys(value.plantState).length} / {plantsPerPlot}</p>
                        <p>Food Per Minute: {calculateFoodPerMinute(value.plantState)}</p>
                        {
                            Object.keys(value.plantState).length === 0 ?
                                <p>No plants have been planted.</p>
                                :
                                <div className='plant-grid'>
                                    {Object.values(value.plantState).map((plant, index) =>
                                        <div className='plant-elem' key={plant.id}>
                                            <p>{plant.state.name}</p>
                                            <img className='small-icon' src={plant.state.imgURL}></img>
                                            {getFertilizeButton(plant, value)}
                                        </div>
                                    )}
                                </div>
                        }

                        <p>
                            <button disabled={purchasePlantDisabled(value)} onClick={() => purchasePlant(value)}>Purchase Plant ({costPerPlant} Food)</button>
                        </p>

                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
