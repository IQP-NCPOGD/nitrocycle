import React from 'react';

import '../../farmers-log-styles.css';

function AmmoniumSilo(props) {

    return (
            <ul>
                <h1>Ammonium Silo</h1>
                <p>An ammonium silo is an enclosed structure used to store volatile, flammable, and toxic materials such as ammonium nitrate. It is typically made of steel or reinforced concrete and is designed to protect the contents from external sources of heat, such as sparks and flames, and to contain any explosions that may occur due to the combustible nature of the material.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>

    );
}

export default AmmoniumSilo;
