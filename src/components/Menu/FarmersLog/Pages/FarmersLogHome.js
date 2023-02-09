import React from 'react';
import { useState } from 'react';

import '../../styles.css';

function FarmersLogHome(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    let tabArray = [
        <div className='tiles'>
            <button className="pressable" onClick={props.update("Potato Plant")}>                            
                <div className='banner'>
                    <h4>Plant</h4>
                </div> 
                <img src="../../../../../data/images/plant.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" onClick={props.update("Food")}>                            
                <div className='item-name'>
                    <h4>Food</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
        </div>];

    return (
            <div className='main'>

                    <div className="tab">
                        <button className='tabule' onClick={() => setSelectedIndex(0)}>Resources</button>
                        <button className='tabule' onClick={() => setSelectedIndex(1)}>Tile</button>
                        <button className='tabule' onClick={() => setSelectedIndex(2)}>Concepts</button>
                    </div>
                    {tabArray[selectedIndex]}

            </div> 
    );
}


export default FarmersLogHome;
