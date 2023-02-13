import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenFixation(props) {

    return (
            <ul>
                <h1>Nitrogen Fixation</h1>
                <p>This is the page for Nitrogen Fixation.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenFixation;
