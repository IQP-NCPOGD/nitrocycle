import React from 'react';
import { useState } from 'react';

import '../farmers-log-styles.css';

const pages = [
    {
      tab: [
        {
         page: 'Food',
         src: '/data/images/potato.png'
        },
        {
          page: 'Ammonium',
          src: '/data/images/ammonium_chemical.png'
        },
        {
          page: 'Nitrogen Runoff',
          src: '/data/images/nitrogen-runoff.png'
        }
      ]
    }, 
    {
      tab: [
        {
          page: 'Potato Plant',
          src: '/data/images/plant.png'
        },
        {
          page: 'Food Silo',
          src: '/data/images/food-silo.png'
        },
        {
          page: 'Ammonium Silo',
          src: '/data/images/ammonium-silo.png'
        },
        {
          page: 'Nitrogen Fixator',
          src: '/data/images/nitrogen-fixator.png'
        }
      ]
    },
    {
        tab: [
          {
            page: 'Nitrogen Cycle',
            src: '/data/images/nitrogen-cycle.png'
          },
          {
            page: 'Nitrogen Fixation',
            src: '/data/images/nitrogen-fixation.png'
          },
          {
            page: '(De)Nitrification',
            src: '/data/images/denitrification-nitrification.png'
          }
        ]
      }
  ];
  
  const FarmersLogPages = (props) => {
    const page = pages[props.pagesIndex];
    return (<div className='page'>
      {
        page.tab.map(page => 
        (<button  onClick={props.update(page.page)}>
          <h5>{page.page}</h5>
          <img src={page.src}/>
        </button>))
      } 
    </div>);
  }

function FarmersLogHome(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
                <ul>
                    <ul>
                        <h2>Farmer's Log</h2>
                        <p>Welcome to the Farmer's Log. Here is a list of all the current pages:</p>
                    </ul>
                        <div>
                            <div className="tab">
                                <button onClick={() => setSelectedIndex(0)}>Resources</button>
                                <button onClick={() => setSelectedIndex(1)}>Tile</button>
                                <button onClick={() => setSelectedIndex(2)}>Concepts</button>
                            </div>
                            <FarmersLogPages pagesIndex={selectedIndex} update={props.update}/>
                        </div>

                </ul>
    );
}


export default FarmersLogHome;
