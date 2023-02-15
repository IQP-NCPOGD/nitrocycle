import React, { Text } from 'react';
import { useState } from 'react';
import { menus, setActiveMenu } from '..';
import { baseTriviaPunishment, baseTriviaReward, GameStateContext, msToNewTriviaQuestion } from '../../Game';
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
        src: '/data/images/nitrogen-runoff.png',
        correct: true
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
        answer: '(De)Nitrification',
        src: '/data/images/denitrification-nitrification.png',
        correct: true
      }
    ]
  },
  {
    question: "Which of the following is could explode if not properly maintained?",
    answers: [
      {
        answer: 'Ammonium Silo',
        src: '/data/images/ammonium-silo.png',
        correct: true
      },
      {
        answer: 'Food Silo',
        src: '/data/images/food-Silo.png'
      },
      {
        answer: 'Potato Plant',
        src: '/data/images/plant.png'
      },
      {
        answer: 'Food',
        src: '/data/images/potato.png'
      }
    ]
  },
  {
    question: "Which of the following is the cycle in which nitrogen is converted between its various chemical forms?",
    answers: [
      {
        answer: '(De)Nitrification',
        src: '/data/images/denitrification-nitrification.png',
      },
      {
        answer: 'Nitrogen Cycle',
        src: '/data/images/nitrogen-cycle.png',
        correct: true
      },
      {
        answer: 'Nitrogen Runoff',
        src: '/data/images/nitrogen-runoff.png'
      },
      {
        answer: 'Food Silo',
        src: '/data/images/food-Silo.png'
      }
    ]
  },
  {
    question: "Which of the following is can be eaten by humans and used to increase food security in developing countries?",
    answers: [
      {
        answer: '(De)Nitrification',
        src: '/data/images/denitrification-nitrification.png',
      },
      {
        answer: 'Ammonium',
        src: '/data/images/ammonium-chemical.png'
      },
      {
        answer: 'Nitrogen Runoff',
        src: '/data/images/nitrogen-runoff.png'
      },
      {
        answer: 'Food',
        src: '/data/images/potato.png',
        correct: true
      }
    ]
  },
];

const checkAnswer = (correct, value) => {
  if (correct) {
    value.setFoodValidated((old) => old + ((value.triviaCombo+1) * baseTriviaReward));
    value.setTriviaCombo((old) => old+1);
    value.setCurrentQuestion(-1);
  } else {
    value.setFoodValidated((old) => old - baseTriviaPunishment);
    value.setTriviaCombo(0);
    value.setCurrentQuestion(-2);
  }
  setTimeout(() => value.setCurrentQuestion(Math.floor(Math.random() * questions.length)), msToNewTriviaQuestion);
}

const TriviaQuestion = (props) => {
  return (
    <GameStateContext.Consumer>
      {value => {

        const questionIndex = props.questionIndex ?? value.currentQuestion;
        
        if (questionIndex < 0) {
          
          return (
            <>
            {
              value.currentQuestion === -1 ? 
              <h2>Correct! +{((value.triviaCombo) * baseTriviaReward)} Food</h2> 
              : 
              <h2>Incorrect -{baseTriviaPunishment} Food</h2>
            }
            <p>Come back in a minute for another question and chance to win food!</p>
            </>
          );

        } else {
          
          const question = questions[questionIndex]

          return (
            <>
              <p>Current Combo: {value.triviaCombo}x</p>
              <div className='question'>
                <h4>{question.question}</h4>
                {
                  question.answers.map(answer =>
                  (<button onClick={() => checkAnswer(answer.correct, value)}>
                    <h5>{answer.answer}</h5>
                    <img src={answer.src} />
                  </button>))
                }

              </div>
            </>
          );

        }
      }
      }
    </GameStateContext.Consumer>);
}

const Trivia = (props) => {

  return (
    <div className="menu">

      <h2>Trivia</h2>
      <p>Welcome to the Trivia. Answer Trivia Questions to earn Food!</p>

      <TriviaQuestion />
      <div className='controls'>
        <button className='close' onClick={() => setActiveMenu(menus.none)}>Close</button>
      </div>
    </div>
  );

};

export default Trivia;

