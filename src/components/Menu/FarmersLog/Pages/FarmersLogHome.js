import React from 'react';
import { useState } from 'react';
import { GameStateContext, markPageAs, newPage, readPage } from '../../../Game';

import '../farmers-log-styles.css';

const pages = [
    {
      tab: [
        {
         page: 'Food',
         src: 'data/images/potato.png'
        },
        {
          page: 'Ammonium',
          src: 'data/images/ammonium_chemical.png'
        },
        {
          page: 'Nitrogen Runoff',
          src: 'data/images/nitrogen-runoff.png'
        }
      ]
    }, 
    {
      tab: [
        {
          page: 'Potato Plant',
          src: 'data/images/plant.png'
        },
        {
          page: 'Food Silo',
          src: 'data/images/food-silo.png'
        },
        {
          page: 'Ammonium Silo',
          src: 'data/images/ammonium-silo.png'
        },
        {
          page: 'Nitrogen Fixator',
          src: 'data/images/nitrogen-fixator.png'
        }
      ]
    },
    {
        tab: [
          {
            page: 'Nitrogen Cycle',
            src: 'data/images/nitrogen-cycle.png'
          },
          {
            page: 'Nitrogen Fixation',
            src: 'data/images/nitrogen-fixation.png'
          },
          {
            page: '(De)Nitrification',
            src: 'data/images/denitrification-nitrification.png'
          }
        ]
      }
  ];
  
const FarmersLogPages = (props) => {
  const page = pages[props.pagesIndex];
  return (
    <GameStateContext.Consumer>
      {value => {

        return <div className='page home'>
          {
            page.tab.map((page) => {
              let pageStatus = value.unlockedPages[page.page];
              let newUnlock = pageStatus === newPage;

              return pageStatus ?

                <button onClick={() => {
                  markPageAs(value.setUnlockedPages, page.page, readPage);
                  (props.update(page.page))();
                }}>
                  <h5>{page.page}</h5>
                  <img src={page.src} />
                  {newUnlock ? <span className='new-badge'>NEW</span> : undefined}
                </button> 
                :
                undefined
            }
            )
          }
        </div>
      }
      }
    </GameStateContext.Consumer>
  );
}

function FarmersLogHome(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div>
            <h2>Farmer's Log</h2>
                <p>Welcome to the Farmer's Log. Here is a list of all the current pages:</p>
                    <div className='tab'>
                        <button onClick={() => setSelectedIndex(0)}>Resources</button>
                        <button onClick={() => setSelectedIndex(1)}>Tile</button>
                        <button onClick={() => setSelectedIndex(2)}>Concepts</button>
                    </div>
                <FarmersLogPages pagesIndex={selectedIndex} update={props.update}/>
        </div>
    );
}


export default FarmersLogHome;
