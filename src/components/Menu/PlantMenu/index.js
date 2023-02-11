import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { calculateFoodPerMinute, costPerPlant, createPlant, GameStateContext, plantsPerPlot, plantTypeEnum } from '../../Game';

import './styles.css';


export default function PlantMenu(props) {

    const purchasePlant = (value) => {
        if(purchasePlantDisabled(value)) return;
        if(value.setFoodValidated((old) => old - costPerPlant)) {
            value.setPlantState((old) => [...old, createPlant()])
        }
    }

    const purchasePlantDisabled = (value) => {
        return value.food < costPerPlant || value.plantState.length >= plantsPerPlot
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
                        <p>Plants: {value.plantState.length} / {plantsPerPlot}</p>
                        <p>Food Per Minute: {calculateFoodPerMinute(value.plantState)}</p>
                        {
                            value.plantState.length === 0 ?
                                <p>No plants have been planted.</p>
                                :
                                <div className='plant-grid'>
                                    {value.plantState.map((plant, index) =>
                                        <div className='plant-elem'>
                                            <p>{plant.state.name}</p>
                                            <img className='small-icon' src={plant.state.imgURL}></img>
                                            {
                                                (plant.state !== plantTypeEnum.bloom && plant.state !== plantTypeEnum.sprout) ?
                                                    <button>Fertilize ({plant.state === plantTypeEnum.wilt ? 6 : 2})</button> :
                                                    ""
                                            }
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
