import React from 'react';

import '../../farmers-log-styles.css';

function Denitrification(props) {

    return (
            <ul>
                <h1>(De)Nitrification</h1>
                <p>A denitrifier is an organism that can convert nitrate and nitrite compounds into molecular nitrogen gas (N2). This process is known as denitrification and is carried out by certain bacteria and fungi. Denitrification plays an important role in the global nitrogen cycle, helping to remove excess nitrogen from the environment.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Denitrification;
