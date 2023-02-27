import React, { useState, Text } from 'react';
import { menus, setActiveMenu } from '..';
import { calculateFoodPerMinute, costPerPlant, createPlant, fertilizePlant, GameStateContext, plantsPerPlot, plantTypeEnum } from '../../Game';

import '../menu.css';
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
        value.setAmmoniumValidated((old) => old - (plant.state.upgradeCost ?? 0));
        if(!value.setNitrogenRunoffValidated( (old) => old + plant.state.nroProduced )) setActiveMenu(menus.gameOverMenu)
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
            { value =>
                <div className='menu'>
                  <h2>Plant Plot</h2>
                  <p>Active Plants: {Object.keys(value.plantState).length} / {plantsPerPlot}</p>
                  <p>Food Per Minute: {calculateFoodPerMinute(value.plantState)}</p>
                  { Object.keys(value.plantState).length === 0 ?
                      <p>No plants have been planted.</p>
                    :
                      <div className='menu-grid'>
                        { Object.values(value.plantState).map((plant, index) =>
                            <div className='grid-item' key={plant.id}>
                              <p>{plant.state.name}</p>
                              <img className='icon' src={plant.state.imgURL}></img>
                              {getFertilizeButton(plant, value)}
                            </div>
                        ) }
                      </div>
                  }
                  <div className='controls'>
                    <button disabled={purchasePlantDisabled(value)} 
                            onClick={() => purchasePlant(value)}>
                      Purchase Plant ({costPerPlant} Food)
                    </button>
                    <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
                  </div>                            
                </div>
            }
        </GameStateContext.Consumer>
    );
}



