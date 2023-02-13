import React from 'react';

import '../../farmers-log-styles.css';

function Ammonium(props) {

    return (
            <ul>
                <h1>Ammonium</h1>
                <p>This is the page for Ammonium.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Ammonium;
