import React from 'react';

import '../../farmers-log-styles.css';

function Nitrogen(props) {

    return (
            <ul>
                <h1>Nitrogen</h1>
                <p>This is the page for Nitrogen.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Nitrogen;
