import React from 'react';

import '../../../styles.css';

function NitrogenFixation(props) {

    return (
        <div className='main'>
            <ul>
                <h1>Nitrogen Fixation</h1>
                <p>This is the page for Nitrogen Fixation.</p>
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

export default NitrogenFixation;
