import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { calculateAmmoniumPerMinute, costPerFixator, createFixator, fixatorsPerPlot, GameStateContext } from '../../Game';

import '../menu.css';


export default function FixatorMenu(props) {

    const purchaseFixator = (value) => {
        if (purchaseFixatorDisabled(value)) return;
        if (value.setFoodValidated((old) => old - costPerFixator)) {
            createFixator(value.setFixatorState);
        }
    }

    const purchaseFixatorDisabled = (value) => {
        return value.food < costPerFixator || Object.keys(value.fixatorState).length >= fixatorsPerPlot
    }

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='menu'>
                                        <div>
                        <h3>Nitrogen Fixator Plot</h3>
                        <p>Fixators: {Object.keys(value.fixatorState).length} / {fixatorsPerPlot}</p>
                        <p>Ammonium Per Minute: {calculateAmmoniumPerMinute(value.fixatorState)}</p>
                        {
                            Object.keys(value.fixatorState).length === 0 ?
                                <p>No nitrogen fixators have been placed.</p>
                                :
                                <div className='menu-grid'>
                                    {Object.values(value.fixatorState).map((fixator, index) =>
                                        <div className='grid-item' key={fixator.id}>
                                            <p>{fixator.state.name}</p>
                                            <img className='icon big' src={fixator.state.imgURL}></img>
                                        </div>
                                    )}
                                </div>
                        }

                    <div className='controls'>
                            <button disabled={purchaseFixatorDisabled(value)} onClick={() => purchaseFixator(value)}>Purchase Nitrogen Fixator ({costPerFixator} Food)</button>
                        <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>

                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
