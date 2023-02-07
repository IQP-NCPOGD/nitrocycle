import React from 'react';

import '../../styles.css';

function FoodSilo(props) {

    return (
        <div className='main'>
            <h1>Food Silo</h1>
            <p>This is the page for the Food Silo.</p>
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

export default FoodSilo;
