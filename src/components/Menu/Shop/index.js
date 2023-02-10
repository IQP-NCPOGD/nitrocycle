import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';

import { GameStateContext } from '../../Game';

import './styles.css';


export default function Shop(props) {

    return (
        <div className='shop-main'>
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
                                    onClick={() => {
                                        value.setFoodValidated((old) => old - 100) ?
                                            value.setAmmoniumValidated((old) => old + 1) :
                                            window.alert(`You need ${100 - value.food} more food to purchase this.`)
                                    }
                                    }
                                    disabled={value.food < 100 || value.ammonium === value.maxAmmonium}
                                >Purchase 1 Ammonium (100 food)</button>
                            }
                        </GameStateContext.Consumer>

                    </li>
                </ul>
            </div>
        </div>
    );
}
