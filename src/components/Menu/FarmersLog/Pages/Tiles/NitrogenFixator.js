import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenFixator(props) {

    return (
            <ul>
                <h1>Nitrogen Fixator</h1>
                <p>This is the page for the Nitrogen Fixator.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenFixator;
