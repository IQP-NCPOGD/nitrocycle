import React from 'react';

import '../../farmers-log-styles.css';

function NitrogenFixator(props) {

    return (
        <div className='main'>
            <ul>
                <h1>Nitrogen Fixator</h1>
                <p>This is the page for the Nitrogen Fixator.</p>
                <div class='true-center'>
                    <button class="pressable" type="button" onClick={props.update("Home")}>
                        <div class='item-name'>
                            <h4>Home</h4>
                        </div> 
                        <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
                    </button>
                </div>
            </ul>
        </div>
    );
}

export default NitrogenFixator;
