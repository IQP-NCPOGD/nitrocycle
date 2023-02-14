import React, {Text} from 'react';
import { useState } from 'react';
import { menus, setActiveMenu } from '..';
import '../menu.css';
import './styles.css';

const questions = [
  {
    question: "Which of the following is a pollutant?",
    answers: [
      {
        answer: 'Food',
        src: '/data/images/plant.png'
      },
      {
        answer: 'Ammonium',
        src: '/data/images/ammonium_chemical.png'
      },
      {
        answer: 'Nitrogen',
        src: '/data/images/nitrogen.png'
      },
      {
        answer: 'Nitrogen Runoff',
        src: '/data/images/nitrogen-runoff.png'
      }
    ]
  }, 
  {
    question: "Which of the following is the microbial process of reducing nitrate and nitrite to gaseous forms of nitrogen?",
    answers: [
      {
        answer: 'Potato Plant',
        src: '/data/images/plant.png'
      },
      {
        answer: 'Nitrogen Cycle',
        src: '/data/images/nitrogen-cycle.png'
      },
      {
        answer: 'Nitrogen Fixation',
        src: '/data/images/nitrogen-fixation.png'
      },
      {
        answer: 'Denitrification',
        src: '/data/images/denitrification-nitrification.png'
      }
    ]
  }
];

const TriviaQuestion = (props) => {
  const question = questions[props.questionIndex];
  return (<div className='question'>
    <h4>{question.question}</h4>
    {
      question.answers.map(answer => 
      (<button>
        <h5>{answer.answer}</h5>
        <img src={answer.src}/>
      </button>))
    }
  </div>);
}

const Trivia = (props) => {
 
	return (
        <div className="menu">
            
            <h2>Trivia</h2>
            <p>Welcome to the Trivia. Answer Trivia Questions to earn Food!</p>
            
            <TriviaQuestion questionIndex={Math.floor(Math.random() * questions.length)}/>
            <div className='controls'>
                <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
            </div>
        </div>
	);

};

export default Trivia;

