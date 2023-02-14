import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenFixation(props) {

    return (
            <ul>
                <h1>Nitrogen Fixation</h1>
                <p>Nitrogen fixation is the process of turning nitrogen from the atmosphere for living organisms to use. The process of nitrogen fixation is usually done by bacteria, either free of symbiotic in nature.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenFixation;
