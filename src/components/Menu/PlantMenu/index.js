import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { GameStateContext, plantStateEnum } from '../../Game';

import './styles.css';


export default function PlantMenu(props) {

    function getPlantGUI(value) {
        switch (value.plantState) {
            case plantStateEnum.wilt:
                return (
                    <>
                        <h3>The plant has wilted.</h3>
                        <p>Producing {value.plantState.foodproduction} FPM</p>
                        <button onClick={() => value.setPlantState(plantStateEnum.bloom)}>Fertilze</button>
                    </>

                );
            case plantStateEnum.notpurchased:
                return (
                    <>
                        <h3>The plant is available for purchase.</h3>
                        <button onClick={() => value.setPlantState(plantStateEnum.sprout)}>Purchase</button>
                    </>
                );
            case plantStateEnum.sprout:
                return (
                    <>
                        <h3>The plant is sprouting.</h3>
                        <p>Producing {value.plantState.foodproduction} FPM</p>
                        <button onClick={() => value.setPlantState(plantStateEnum.plant)}>Fertilze</button>
                    </>
                );
            case plantStateEnum.plant:
                return (
                    <>
                        <h3>The plant is grown.</h3>
                        <p>Producing {value.plantState.foodproduction} FPM</p>
                        <button onClick={() => value.setPlantState(plantStateEnum.bloom)}>Fertilze</button>
                    </>
                );
            case plantStateEnum.bloom:
                return (
                    <>
                        <h3>The plant is blooming.</h3>
                        <p>Producing {value.plantState.foodproduction} FPM</p>
                        <button onClick={() => value.setPlantState(plantStateEnum.wilt)}>Fertilze</button>
                    </>
                );
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
                        <p>Plant</p>
                        {
                            getPlantGUI(value)
                        }

                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
