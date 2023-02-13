import React from 'react';

import '../../farmers-log-styles.css';

function PotatoPlant(props) {

    return (
            <ul>
                <h1>Potato Plant</h1>
                <p>This is the page for the Potato Plant.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default PotatoPlant;
