import React from 'react';
import { useState } from 'react';
import { menus, setActiveMenu } from '..';
import './styles.css';

const Trivia = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    let quizArray = [
        ["Which of the following is a pollutant?",
        <div className="Quiz-Answers">
            <button className="butt" type="button">                            
                <div className='banner'>
                    <h4>Food</h4>
                </div> 
                <img src="/data/images/potato.png" alt="buttonpng" border="0"/>
            </button>
            <button className="butt" type="button">                            
                <div className='banner'>
                    <h4>Ammonium</h4>
                </div> 
                <img src="/data/images/ammonium.png" alt="buttonpng" border="0"/>
            </button>
            <button className="butt" type="button">
                <div className='banner'>
                    <h4>Nitrogen</h4>
                </div> 
                <img src="../../../../logo192.png" alt="buttonpng" border="0"/>
            </button>
            <button className="butt" type="button" onClick={() => setSelectedIndex(1)}>
                <div className='banner'>
                    <h4>Nitrogen Runoff</h4>
                </div> 
                <img src="../../../../logo192.png" alt="buttonpng" border="0"/>
            </button>
        </div>],
        ["Which of the following is the microbial process of reducing nitrate and nitrite to gaseous forms of nitrogen?",
        <div className="Quiz-Answers">
            <button className="butt" type="button">                            
                <div className='banner'>
                    <h4>Potato Plant</h4>
                </div> 
                <img src="/data/images/plant.png" alt="buttonpng" border="0"/>
            </button>
            <button className="butt" type="button">                            
                <div className='banner'>
                    <h4>Nitrogen Cycle</h4>
                </div> 
                <img src="../../../../logo192.png" alt="buttonpng" border="0"/>
            </button>
            <button className="butt" type="button">
                <div className='banner'>
                    <h4>Nitrogen Fixation</h4>
                </div> 
                <img src="../../../../logo192.png" alt="buttonpng" border="0"/>
            </button>
            <button className="butt" type="button" onClick={() => setSelectedIndex(1)}>
                <div className='banner'>
                    <h4>Denitrification</h4>
                </div> 
                <img src="../../../../logo192.png" alt="buttonpng" border="0"/>
            </button>
        </div>]

    ]
  
	return (
        <div className="main">
            <button onClick={() => setActiveMenu(menus.none)}>Close</button>
            <h1>Trivia</h1>
            <p>Welcome to the Trivia.</p>
            <p>Answer Trivia Questions to earn Food!</p>
            <h4>{quizArray[selectedIndex][0]}</h4>
            <div className='Quiz'>
                

                {quizArray[selectedIndex][1]}
                
            </div>
        </div>
	);

};

export default Trivia;

