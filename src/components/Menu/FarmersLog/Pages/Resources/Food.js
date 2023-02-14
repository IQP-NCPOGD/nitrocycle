import React from 'react';

import '../../farmers-log-styles.css';

function Food(props) {

    return (
            <ul>
                <h1>Food</h1>
                <p>This is the page for Food.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Food;
