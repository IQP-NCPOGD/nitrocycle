import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenCycle(props) {

    return (
            <ul>
                <h1>Nitrogen Cycle</h1>
                <p>The nitrogen cycle is the process by which nitrogen is converted between its various chemical forms. This transformation can be carried out through both biological and physical processes. In biological processes, nitrogen is converted by nitrogen-fixing bacteria, which convert it from atmospheric nitrogen gas (N2) into a form that can be used by plants and other organisms. Physical processes, such as lightning and industrial activities, can convert nitrogen into various compounds, such as nitrates and nitrites, which can be used by plants and animals.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenCycle;
