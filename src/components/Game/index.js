import React, { useState, useCallback, useEffect, useRef } from "react"
import ARComponent from "../ARComponent"
import GUIComponent from "../GUIComponent"
import MenuHandler from "../Menu"

import './styles.css'

export const ModelContext = React.createContext();
export const GameStateContext = React.createContext();

export const plantsPerPlot = 25;
export const costPerPlant = 25;
export const costPerAmmonium = 100;

export const plantTypeEnum = {
    wilt: {
        name: "Wilt",
        imgURL: "/data/images/wilt.png",
        foodproduction: 2,
        upgradeCost: 6,
    },
    sprout: {
        name: "Sprout",
        imgURL: "/data/images/sprout.png",
        foodproduction: 5,
    },
    plant: {
        name: "Plant",
        imgURL: "/data/images/plant.png",
        foodproduction: 10,
        upgradeCost: 2,
    },
    bloom: {
        name: "Bloom",
        imgURL: "/data/images/bloom.png",
        foodproduction: 15,
    },
}

let currentPlantId = 0;
export const createPlant = (setPlantState) => {
    let createdPlant = {
        id: currentPlantId,
        timeoutID: null,
        state: plantTypeEnum.sprout,
    }

    createdPlant.timeoutID = setTimeout(() => setPlantState((oldest) => {
        let id = createdPlant.id;
        createdPlant.state = plantTypeEnum.plant;

        createdPlant.timeoutID = setTimeout(() => setPlantState((old) => {
            let id = createdPlant.id;
            createdPlant.state = plantTypeEnum.wilt

            return {...old, [id]: Object.create(createdPlant)}
        }), 5000);

        return {...oldest, [id]: Object.create(createdPlant)}
    }), 10000);

    setPlantState((old) => {
        let id = createdPlant.id;
        return {...old, [id]: Object.create(createdPlant)}
    });

    currentPlantId++;
}

export const fertilizePlant = (plantID, setPlantState) => {
    setPlantState((old) => {
        let oldPlant = old[plantID];
        clearTimeout(oldPlant.timeoutID);
        oldPlant.state = plantTypeEnum.bloom;
        return {...old, [plantID]: oldPlant}
    })
}

export const calculateFoodPerMinute = (plantState) => {
    return Object.values(plantState).reduce((accumulator, plant) => accumulator + plant.state.foodproduction, 0)
}

const generateValidator = (currentRef, maxRef, setState) => {
    return (cb) => {
        let nextVal = cb(currentRef.current);
        if(nextVal > maxRef.current) {
            setState((old) => maxRef.current);
            return false;
        } else if (nextVal < 0) {
            return false;
        } else {
            setState(cb);
            return true;
        }
    }
}

export function Game(props) {

    // ---------- STATE ----------
    
        // Game Data

    const [foodSecurityLevel, setFoodSecurityLevel] = useState(0);
    
    const [food, setFood] = useState(25);
    const [maxFood, setMaxFood] = useState(200);
    const [ammonium, setAmmonium] = useState(0);    
    const [maxAmmonium, setMaxAmmonium] = useState(10);
    const [nitrogenRunoff, setNitrogenRunoff] = useState(0);
    const [maxNitrogenRunoff, setMaxNitrogenRunoff] = useState(5);

    const [plantState, setPlantState] = useState({});

        // Refs

    const foodRef = useRef(food); foodRef.current = food;
    const maxFoodRef = useRef(maxFood); maxFoodRef.current = maxFood;

    const ammoniumRef = useRef(ammonium); ammoniumRef.current = ammonium;
    const maxAmmoniumRef = useRef(maxAmmonium); maxAmmoniumRef.current = maxAmmonium;

    const foodRateRef = useRef(0);
    const ammoniumRate = useRef(0);

        // Validators

    const setFoodValidated = generateValidator(foodRef, maxFoodRef, setFood);
    const setAmmoniumValidated = generateValidator(ammoniumRef, maxAmmoniumRef, setAmmonium);

        // Tile Visibility

    const [plantVisible, setPlantVisible] = useState(true);

    useEffect(() => {
        /*
        Currently only solution I know to fix rendering on state changes
        This is because state change causes a re-render of the component

        Dispatching the resize event fixes the canvas rendering,
        so it should be called after any state changes
        */
        window.dispatchEvent(new Event('resize'));
    }, [food, plantVisible, plantState])

    // ---------- GAME LOGIC ----------

    // add food every second
    useEffect(() => {
        setInterval(() => setFoodValidated( (old) => old + foodRateRef.current ), 1000);
    }, []);

    // update food production when plants change
    useEffect(() => {
        foodRateRef.current = calculateFoodPerMinute(plantState);
    }, [plantState])

    // ---------- CALLBACKS ----------

    let bloomTimeout = null;

    const plantFound = useCallback(() => {
        clearTimeout(bloomTimeout);
        setPlantVisible(true);
    }, []);

    const plantLost = useCallback(() => {
        window.dispatchEvent(new Event('resize'));
        clearTimeout(bloomTimeout);
        bloomTimeout = setTimeout(() => setPlantVisible(false), 2000);
    }, []);

    // ---------- PROPS ----------

    const currentState = {
        foodSecurityLevel, setFoodSecurityLevel,
        food, setFoodValidated,
        maxFood, setMaxFood,
        ammonium, setAmmoniumValidated,
        maxAmmonium, setMaxAmmonium,
        nitrogenRunoff, setNitrogenRunoff,
        maxNitrogenRunoff, setMaxNitrogenRunoff,
        plantState, setPlantState,
        plantVisible, setPlantVisible,
    }

    const ARprops = {
        plantFound,
        plantLost,
    }

    const GUIprops = {
        ...currentState
    }

		
    // ---------- RENDER ----------

    return (
        <>
            <ModelContext.Provider value={{plantState}}>
                <ARComponent {...ARprops} />
            </ModelContext.Provider>

            <GUIComponent
                {...GUIprops}
            />

            <GameStateContext.Provider value={{...currentState}}>
                <MenuHandler/>
            </GameStateContext.Provider>
					

        </>
    );
}
