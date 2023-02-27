import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';

import { costPerAmmonium, foodSecurityLevelCosts, GameStateContext, ammoniumMerchantLevel, foodSecurityLevelMaxNRO, markPageAsNew } from '../../Game';

import '../menu.css';

const getFSLButton = (level, value) => {

    let upgradeCost = foodSecurityLevelCosts[level];
    let tooExpensive = upgradeCost > value.food;

    let isNextLevel = level === value.foodSecurityLevel+1;
    let parenthesisText = isNextLevel ? `${upgradeCost} Food` : "Bought"

    return (
        <button
            className='styled-button'
            onClick={() => {

                if(value.setFoodValidated((old) => old - upgradeCost)) {
                    if(level === 1) markPageAsNew("Nitrogen Cycle");
                    if(level === 2) markPageAsNew("(De)Nitrification");
                    if(level === 3) markPageAsNew("Nitrogen Fixation");

                    value.setFoodSecurityLevel(level);
                    value.setMaxNitrogenRunoff(foodSecurityLevelMaxNRO[level]);
                    if(level === 4) {
                        startConfetti();
                        setTimeout(() => stopConfetti(), 10000);
                    }
                }
                
            }}
            disabled={!isNextLevel || tooExpensive}
        >Level {level} ({parenthesisText})</button>
    );
}

const getFSLButtons = (value) => {
    return (
        <>
            {value.foodSecurityLevel > -1 ? getFSLButton(1, value) : ""}
            {value.foodSecurityLevel > 0 ? getFSLButton(2, value) : ""}
            {value.foodSecurityLevel > 1 ? getFSLButton(3, value) : ""}
            {value.foodSecurityLevel > 2 ? getFSLButton(4, value) : ""}
        </>
    );
}

export default function Shop(props) {

    const purchaseAmmonium = (value) => {
        if (purchaseAmmoniumDisabled(value)) return;
        value.setFoodValidated((old) => old - costPerAmmonium) ?
            value.setAmmoniumValidated((old) => old + 1) :
            window.alert(`You need ${costPerAmmonium - value.food} more food to purchase this.`)
    }

    const purchaseAmmoniumDisabled = (value) => {
        return value.food < 100 || value.ammonium >= value.maxAmmonium
    }

    return (
        <div className='menu'>

            <div>
                <h3>Shop</h3>
                <p>Spend your food on commodities and upgrades</p>
            </div>

            <p>Ammonium</p>

            <div className='controls'>
                <GameStateContext.Consumer>
                    {value =>
                    value.foodSecurityLevel < ammoniumMerchantLevel ?
                    <button disabled>Food Security Level {ammoniumMerchantLevel} Required</button>
                    :
                        <button
                            className='styled-button'
                            onClick={() => purchaseAmmonium(value)}
                            disabled={purchaseAmmoniumDisabled(value)}
                        >Purchase 1 Ammonium ({costPerAmmonium} food)</button>
                    }
                </GameStateContext.Consumer>
            </div>

            <p>Food Security Levels</p>

            <div className='controls'>
                <GameStateContext.Consumer>
                    {value => getFSLButtons(value)
                    }
                </GameStateContext.Consumer>
            </div>

            <div className='controls'>
                <button class='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
            </div>
        </div>
    );
}
