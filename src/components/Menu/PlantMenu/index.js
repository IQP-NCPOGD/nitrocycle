import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { GameStateContext, plantTypeEnum } from '../../Game';

import './styles.css';


export default function PlantMenu(props) {

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='plant-menu-main'>
                    <div className='controls'>
                        <button onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>
                    <div>
                        <h3>Plant Plot</h3>
                        {
                            value.plantState.length === 0 ?
                                <p>No plants have been planted.</p>
                                :
                                <ul>
                                    {value.plantState.map((plant, index) =>
                                        <li>
                                            <p>Plant #{index} ({plant.name})
                                                <button>Manage</button>
                                            </p>
                                        </li>
                                    )}
                                </ul>
                        }

                        <p>
                            <button onClick={() => value.setPlantState((old) => [...old, plantTypeEnum.sprout]
                            )}>Purchase Plant</button>
                        </p>

                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
