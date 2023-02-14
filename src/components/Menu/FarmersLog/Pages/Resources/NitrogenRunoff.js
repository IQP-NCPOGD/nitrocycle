import React from 'react';


import '../../farmers-log-styles.css';

function NitrogenRunoff(props) {

    return (
            <ul>
                <h1>Nitrogen Runoff</h1>
                <p>Nitrogen runoff (NRO) is the process by which nitrogen is transported by rainwater from land into nearby bodies of water. Nitrogen runoff can cause water pollution, leading to the growth of algal blooms and reduced oxygen levels in water. Producing too much NRO will cause a game over.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default NitrogenRunoff;
