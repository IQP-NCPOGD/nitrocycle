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
    },
    bloom: {
        name: "Bloom",
        imgURL: "/data/images/bloom.png",
        foodproduction: 15,
    },
}

export const createPlant = () => {
    let createdPlant = Object.create({
        state: plantTypeEnum.sprout
    })

    // TODO: fix with proper solution
    setTimeout(() => createdPlant.state = plantTypeEnum.plant, 10000);

    return createdPlant;
}

export const calculateFoodPerMinute = (plantState) => {
    return plantState.reduce((accumulator, plant) => accumulator + plant.state.foodproduction, 0)
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

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export function Game(props) {

    // ---------- STATE ----------
    
        // Game Data

    const [foodSecurityLevel, setFoodSecurityLevel] = useState(0);
    
    const [food, setFood] = useState(0);
    const [maxFood, setMaxFood] = useState(200);
    const [ammonium, setAmmonium] = useState(0);    
    const [maxAmmonium, setMaxAmmonium] = useState(10);
    const [nitrogenRunoff, setNitrogenRunoff] = useState(0);
    const [maxNitrogenRunoff, setMaxNitrogenRunoff] = useState(5);

    const [plantState, setPlantState] = useState([createPlant()]);

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

    const [plantVisible, setPlantVisible] = useState(false);

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
