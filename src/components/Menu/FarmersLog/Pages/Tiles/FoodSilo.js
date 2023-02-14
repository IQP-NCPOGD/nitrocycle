import React from 'react';

import '../../farmers-log-styles.css';

function FoodSilo(props) {

    return (
            <ul>
                <h1>Food Silo</h1>
                <p>Food silos are storage containers used to store and preserve food. They are typically made of plastic or metal and can be used to store grains, flour, cereal, and other dry food items. They are air-tight, rodent-proof, and moisture-resistant to help preserve the food inside.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default FoodSilo;
