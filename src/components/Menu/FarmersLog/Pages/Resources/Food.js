import React from 'react';

import '../../farmers-log-styles.css';

function Food(props) {

    return (
            <ul>
                <h1>Food</h1>
                <p>The main currency of this game. Use food to purchase various things that will allow you to progress through the game!</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Food;
