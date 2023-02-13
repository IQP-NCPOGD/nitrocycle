import React from 'react';

import '../../../styles.css';

function Nitrogen(props) {

    return (
        <div className='main'>
            <ul>
                <h1>Nitrogen</h1>
                <p>This is the page for Nitrogen.</p>
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

export default Nitrogen;
