import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { calculateAmmoniumPerMinute, costPerFixator, createFixator, fixatorsPerPlot, GameStateContext } from '../../Game';

import '../styles.css';


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
                <div className='menu-main'>
                    <div className='controls'>
                        <button onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>
                    <div>
                        <h3>Nitrogen Fixator Plot</h3>
                        <p>Fixators: {Object.keys(value.fixatorState).length} / {fixatorsPerPlot}</p>
                        <p>Ammonium Per Minute: {calculateAmmoniumPerMinute(value.fixatorState)}</p>
                        {
                            Object.keys(value.fixatorState).length === 0 ?
                                <p>No nitrogen fixators have been placed.</p>
                                :
                                <div className='grid'>
                                    {Object.values(value.fixatorState).map((fixator, index) =>
                                        <div className='elem' key={fixator.id}>
                                            <p>{fixator.state.name}</p>
                                            <img className='small-icon' src={fixator.state.imgURL}></img>
                                        </div>
                                    )}
                                </div>
                        }

                        <p>
                            <button disabled={purchaseFixatorDisabled(value)} onClick={() => purchaseFixator(value)}>Purchase Nitrogen Fixator ({costPerFixator} Food)</button>
                        </p>

                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
