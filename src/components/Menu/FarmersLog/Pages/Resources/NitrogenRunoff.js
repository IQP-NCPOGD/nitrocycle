import React from 'react';


import '../../farmers-log-styles.css';

function NitrogenRunoff(props) {

    return (
        <div className='main'>
            <ul>
                <h1>Nitrogen Runoff</h1>
                <p>This is the page for the Nitrogen Runoff.</p>
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

export default NitrogenRunoff;
