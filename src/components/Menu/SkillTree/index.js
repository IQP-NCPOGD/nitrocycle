import React from 'react';
import { menus, setActiveMenu } from '..';
import { GameStateContext } from '../../Game';

import '../menu.css';

export default function SkillTree(props) {

    return (
        <GameStateContext.Consumer>
            {value =>
                <div className='menu'>
                        <h2>Skill Tree</h2>
                    <div className='controls'>
                      <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
                    </div>
                </div>
            }
        </GameStateContext.Consumer>
    );
}
