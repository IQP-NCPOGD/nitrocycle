import React from 'react';

import '../../styles.css';

function Nitrogen(props) {

    return (
        <div className='main'>
            <h1>Nitrogen</h1>
            <p>This is the page for Nitrogen.</p>
            <div class='true-center'>
                <button class="butt" type="button" onClick={props.update("Home")}>
                    <div class='banner'>
                        <h4>Home</h4>
                    </div> 
                    <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
                </button>
            </div>
        </div>
    );
}

export default Nitrogen;
