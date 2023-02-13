import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';
import './farmers-log-styles.css';


import FarmersLogHome from './Pages/FarmersLogHome';

import Food from './Pages/Resources/Food';
import Ammonium from './Pages/Resources/Ammonium';
import Nitrogen from './Pages/Resources/Nitrogen';
import NitrogenRunoff from './Pages/Resources/NitrogenRunoff';

import PotatoPlant from './Pages/Tiles/PotatoPlant';
import FoodSilo from './Pages/Tiles/FoodSilo';
import AmmoniumSilo from './Pages/Tiles/AmmoniumSilo';
import NitrogenFixator from './Pages/Tiles/NitrogenFixator';

import Denitrification from './Pages/Concepts/Denitrification';
import NitrogenCycle from './Pages/Concepts/NitrogenCycle';
import NitrogenFixation from './Pages/Concepts/NitrogenFixation';


function FarmersLog(props) {

    const homepage = props.homepage ?? "Home";

    const [currentPage, setCurrentPage] = useState(homepage);

    const [pageHistory, setPageHistory] = useState([homepage]);
    const [pageHistoryIndex, setPageHistoryIndex] = useState(0);

    const pushPage = (page) => {
        return () => {
            const newPageHistoryIndex = pageHistoryIndex + 1;
            const newPageHistory = [...(pageHistory.slice(0, newPageHistoryIndex)), page];
            const newCurrentPage = newPageHistory[newPageHistoryIndex];

            setPageHistoryIndex(newPageHistoryIndex);
            setPageHistory(newPageHistory);
            setCurrentPage(newCurrentPage);

            // console.log(newCurrentPage, newPageHistory, newPageHistoryIndex);
        }
    };

    const forwardPage = () => {
        const newPageHistoryIndex = pageHistoryIndex + 1;
        const newCurrentPage = pageHistory[newPageHistoryIndex];

        setPageHistoryIndex(newPageHistoryIndex);
        setCurrentPage(newCurrentPage);

        // console.log(newCurrentPage, pageHistory, newPageHistoryIndex);
    };

    const backPage = () => {
        const newPageHistoryIndex = pageHistoryIndex - 1;
        const newCurrentPage = pageHistory[newPageHistoryIndex];

        setPageHistoryIndex(newPageHistoryIndex);
        setCurrentPage(newCurrentPage);

        // console.log(newCurrentPage, pageHistory, newPageHistoryIndex);
    };

    const getCurrentPage = () => {
        switch (currentPage) {
            case "Home":
                return (<FarmersLogHome update={pushPage} />);

            case "Food":
                    return (<Food update={pushPage} />);   
            case "Ammonium":
                return (<Ammonium update={pushPage} />);
            case "Nitrogen":
                return (<Nitrogen update={pushPage} />);
            case "Nitrogen Runoff":
                return (<NitrogenRunoff update={pushPage} />);
            
            case "Potato Plant":
                return (<PotatoPlant update={pushPage} />);
            case "Ammonium Silo":
                return (<AmmoniumSilo update={pushPage} />);
            case "Food Silo":
                return (<FoodSilo update={pushPage} />);
            case "Nitrogen Fixator":
                return (<NitrogenFixator update={pushPage} />);

            case "Nitrogen Cycle":
                    return (<NitrogenCycle update={pushPage} />);   
            case "Nitrogen Fixation":
                    return (<NitrogenFixation update={pushPage} />);       
            case "Denitrification":
                    return (<Denitrification update={pushPage} />);   
                     
            default:
                return (<FarmersLogHome update={pushPage} />);
        }
    };

    return (
        <div className='main'>
            <ul>
            <div className='controls'>
                    <button onClick={() => setActiveMenu(menus.none)}>Close</button>
            </div>
            <div>
                        {(pageHistoryIndex > 0 && pageHistory.length > 1) ?
                            <span className='en-control' onClick={backPage}>←</span> 
                            : <span className='en-control-disabled'>←</span>}

                        {(pageHistoryIndex < pageHistory.length - 1 && pageHistory.length > 1) ?
                            <span className='en-control' onClick={forwardPage}>→</span> :
                            <span className='en-control-disabled'>→</span>}
            </div>  
            {getCurrentPage()}
            </ul>

        </div>
    );
}


export default FarmersLog;
