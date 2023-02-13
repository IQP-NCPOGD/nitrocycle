import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenCycle(props) {

    return (
            <ul>
                <h1>Nitrogen Cycle</h1>
                <p>This is the page for the Nitrogen Cycle.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenCycle;
