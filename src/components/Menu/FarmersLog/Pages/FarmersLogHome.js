import React from 'react';
import { useState } from 'react';

import '../styles.css';

function FarmersLogHome(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    let tabArray = [
        <div className='tiles'>
            <button className="pressable" type="button" onClick={props.update("Food")}>                            
                <div className='banner'>
                    <h4>Food</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" type="button" onClick={props.update("Ammonium")}>                            
                <div className='banner'>
                    <h4>Ammonium</h4>
                </div> 
                <img src="../../../../../data/images/ammonium.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" type="button" onClick={props.update("Nitrogen")}>
                <div className='banner'>
                    <h4>Nitrogen</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" type="button" onClick={props.update("Nitrogen Runoff")}>
                <div className='banner'>
                    <h4>Nitrogen Runoff</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
        </div>,


        <div className='tiles'>
            <button className="pressable" type="button" onClick={props.update("Potato Plant")}>
                <div className='banner'>
                    <h4>Potato Plant</h4>
                </div> 
                <img src="../../../../../data/images/plant.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" type="button" onClick={props.update("Food Silo")}>
                <div className='banner'>
                    <h4>Food Silo</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
                <button className="pressable" type="button" onClick={props.update("Ammonium Silo")}>
                <div className='banner'>
                    <h4>Ammonium Silo</h4>
                </div> 
            <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>  
            <button className="pressable" type="button" onClick={props.update("Nitrogen Fixator")}>
                <div className='banner'>
                        <h4>Nitrogen Fixator</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
        </div>,


        <div className='tiles'>
            <button className="pressable" type="button" onClick={props.update("Nitrogen Cycle")}>                            
                <div className='banner'>
                    <h4>Nitrogen Cycle</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" type="button" onClick={props.update("Nitrogen Fixation")}>                            
                <div className='banner'>
                    <h4>Nitrogen Fixation</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
            <button className="pressable" type="button" onClick={props.update("Denitrification")}>
                <div className='banner'>
                    <h4>Denitrification</h4>
                </div> 
                <img src="../../../../../data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
        </div>];

    return (
            <div className='main'>
                <ul className='center'>
                    <ul>
                        <h1>Farmer's Log Table of Contents</h1>
                        <p>Welcome to the Farmer's Log.</p>
                        <p>Here is a list of all the current pages:</p>
                    </ul>

                        <div className="tab">
                            <button className='tabule' onClick={() => setSelectedIndex(0)}>Resources</button>
                            <button className='tabule' onClick={() => setSelectedIndex(1)}>Tile</button>
                            <button className='tabule' onClick={() => setSelectedIndex(2)}>Concepts</button>
                        </div>
                        {tabArray[selectedIndex]}
                </ul>
            </div> 
    );
}


export default FarmersLogHome;
