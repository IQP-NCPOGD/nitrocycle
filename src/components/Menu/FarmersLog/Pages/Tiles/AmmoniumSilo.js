import React from 'react';

import '../../farmers-log-styles.css';

function AmmoniumSilo(props) {

    return (
            <ul>
                <h1>Ammonium Silo</h1>
                <p>This is the page for the Ammonium Silo.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>

    );
}

export default AmmoniumSilo;
