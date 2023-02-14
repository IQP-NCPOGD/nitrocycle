import React from 'react';

import '../../farmers-log-styles.css';

function Denitrification(props) {

    return (
            <ul>
                <h1>(De)Nitrification</h1>
                <p>This is the page for (De)Nitrification.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Denitrification;
