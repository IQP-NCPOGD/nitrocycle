import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';

import { costPerAmmonium, GameStateContext } from '../../Game';

import '../styles.css';


export default function Shop(props) {

    const purchaseAmmonium = (value) => {
        if(purchaseAmmoniumDisabled(value)) return;
        value.setFoodValidated((old) => old - costPerAmmonium) ?
            value.setAmmoniumValidated((old) => old + 1) :
            window.alert(`You need ${costPerAmmonium - value.food} more food to purchase this.`)
    }

    const purchaseAmmoniumDisabled = (value) => {
        return value.food < 100 || value.ammonium >= value.maxAmmonium
    }

    return (
        <div className='main'>
            <div className='controls'>
                <button onClick={() => setActiveMenu(menus.none)}>Close</button>
            </div>
            <div>
                <p>This is the shop page</p>
                <ul>
                    <li>
                        <GameStateContext.Consumer>
                            {value =>
                                <button
                                    onClick={() => purchaseAmmonium(value)}
                                    disabled={purchaseAmmoniumDisabled(value)}
                                >Purchase 1 Ammonium ({costPerAmmonium} food)</button>
                            }
                        </GameStateContext.Consumer>

                    </li>
                </ul>
            </div>
        </div>
    );
}
