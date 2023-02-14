import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenFixator(props) {

    return (
            <ul>
                <h1>Nitrogen Fixator</h1>
                <p>A device used to produce Ammonium.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenFixator;
