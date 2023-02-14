import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { calculateFoodStorage, costPerFoodSilo, createFoodSilo, foodSilosPerPlot, foodSiloTypeEnum, GameStateContext, upgradeFoodSilo, foodSiloUpgradeLevel } from '../../Game';

import '../menu.css';


export default function FoodSiloMenu(props) {

    const purchaseFoodSilo = (value) => {
        if(purchaseFoodSiloDisabled(value)) return;
        if(value.setFoodValidated((old) => old - costPerFoodSilo)) {
            createFoodSilo(value.setFoodSiloState);
        }
    }

    const purchaseFoodSiloDisabled = (value) => {
        return value.food < costPerFoodSilo || Object.keys(value.foodSiloState).length >= foodSilosPerPlot
    }

    const upgradeFoodSiloClicked = (foodSilo, value) => {
        if(upgradeFoodSiloDisabled(foodSilo, value)) return;
        value.setFoodValidated((old) => old - foodSilo.state.upgradeCost);
        upgradeFoodSilo(foodSilo.id, value.setFoodSiloState)
    }

    const upgradeFoodSiloDisabled = (foodSilo, value) => {
        if(foodSilo.state.upgradeCost !== undefined && foodSilo.state !== foodSiloTypeEnum[5]) {
            return foodSilo.state.upgradeCost > value.food;
        } else {
            return true;
        }
    }

    const getUpgradeButton = (foodSilo, value) => {
        if(value.foodSecurityLevel < foodSiloUpgradeLevel) {
            return <button disabled>Food Security Level {foodSiloUpgradeLevel} Required</button>
        }
        else if(foodSilo.state.upgradeCost !== undefined && foodSilo.state !== foodSiloTypeEnum[5]) {
            return <button disabled={upgradeFoodSiloDisabled(foodSilo, value)} onClick={() => upgradeFoodSiloClicked(foodSilo, value)}>Upgrade ({foodSilo.state.upgradeCost})</button>
        } else {
            return "";
        }
    }

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='menu'>
                  <h2>Food Silo Plot</h2>
                  <p>Silos: {Object.keys(value.foodSiloState).length} / {foodSilosPerPlot}</p>
                  <p>Extra Food Capacity: {calculateFoodStorage(value.foodSiloState)} Food</p>
                  { Object.keys(value.foodSiloState).length === 0 ?
                      <p>No food silos have been placed.</p>
                    :
                      <div className='menu-grid'>
                      { Object.values(value.foodSiloState).map((foodSilo, index) =>
                          <div className='grid-item' key={foodSilo.id}>
                            <p>{foodSilo.state.name}</p>
                            <img className='icon big' src={foodSilo.state.imgURL}></img>
                            {getUpgradeButton(foodSilo, value)}
                          </div>
                      ) }
                      </div>
                  }
                  <div className='controls'>
                    <button disabled={purchaseFoodSiloDisabled(value)} onClick={() => purchaseFoodSilo(value)}>Purchase Food Silo ({costPerFoodSilo} Food)</button>
                    <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
                  </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
