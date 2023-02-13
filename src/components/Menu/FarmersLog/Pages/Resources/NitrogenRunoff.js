import React from 'react';


import '../../farmers-log-styles.css';

function NitrogenRunoff(props) {

    return (
            <ul>
                <h1>Nitrogen Runoff</h1>
                <p>This is the page for the Nitrogen Runoff.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenRunoff;
