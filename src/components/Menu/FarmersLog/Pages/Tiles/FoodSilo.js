import React from 'react';

import '../../farmers-log-styles.css';

function FoodSilo(props) {

    return (
            <ul>
                <h1>Food Silo</h1>
                <p>This is the page for the Food Silo.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default FoodSilo;
