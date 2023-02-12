import React, { useState, useCallback, useEffect, useRef } from "react"
import ARComponent from "../ARComponent"
import GUIComponent from "../GUIComponent"
import MenuHandler from "../Menu"

import './styles.css'

export const ModelContext = React.createContext();
export const GameStateContext = React.createContext();

export const plantsPerPlot = 16;
export const costPerPlant = 25;
export const costPerAmmonium = 100;

export const foodSilosPerPlot = 4;
export const costPerFoodSilo = 50;

const defaultFoodStorage = 200;

const msToDisplayMenu = 2000;
const msToPlant = 10000;
const msToWilt = 5000;
const msToRemoval = 5000;

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

export const foodSiloTypeEnum = {
    1: {
        level: 1,
        name: "Silo (Lvl 1)",
        imgURL: "/data/images/silo.png",
        foodstorage: 200,
        upgradeCost: 30,
    },
    2: {
        level: 2,
        name: "Silo (Lvl 2)",
        imgURL: "/data/images/silo.png",
        foodstorage: 400,
        upgradeCost: 30,
    },
    3: {
        level: 3,
        name: "Silo (Lvl 3)",
        imgURL: "/data/images/silo.png",
        foodstorage: 600,
        upgradeCost: 30,
    },
    4: {
        level: 4,
        name: "Silo (Lvl 4)",
        imgURL: "/data/images/silo.png",
        foodstorage: 800,
        upgradeCost: 30,
    },
    5: {
        level: 5,
        name: "Silo (Lvl 5)",
        imgURL: "/data/images/silo.png",
        foodstorage: 1000,
        upgradeCost: 30,
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

        createdPlant.timeoutID = setTimeout(() => setPlantState((older) => {
            let id = createdPlant.id;
            createdPlant.state = plantTypeEnum.wilt

            createdPlant.timeoutID = setTimeout(() => setPlantState((old) => {
                let id = createdPlant.id;
                let {[id]: removedID, ...nextState} = old;
                return nextState;
            }), msToRemoval);

            return {...older, [id]: Object.create(createdPlant)}
        }), msToWilt);

        return {...oldest, [id]: Object.create(createdPlant)}
    }), msToPlant);

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

let currentFoodSiloId = 0;
export const createFoodSilo = (setFoodSiloState) => {
    let createdFoodSilo = {
        id: currentFoodSiloId,
        timeoutID: null,
        state: foodSiloTypeEnum[1],
    }

    setFoodSiloState((old) => {
        let id = createdFoodSilo.id;
        return {...old, [id]: Object.create(createdFoodSilo)}
    });

    currentFoodSiloId++;
}

export const upgradeFoodSilo = (foodSiloID, setFoodSiloState) => {
    setFoodSiloState((old) => {
        let oldSilo = old[foodSiloID];
        clearTimeout(oldSilo.timeoutID);
        oldSilo.state = oldSilo.state.level === 5 ? foodSiloTypeEnum[5] : foodSiloTypeEnum[oldSilo.state.level+1];
        return {...old, [foodSiloID]: oldSilo}
    })
}

export const calculateFoodPerMinute = (plantState) => {
    return Object.values(plantState).reduce((accumulator, plant) => accumulator + plant.state.foodproduction, 0)
}

export const calculateFoodStorage = (foodSiloState) => {
    return Object.values(foodSiloState).reduce((accumulator, foodSilo) => accumulator + foodSilo.state.foodstorage, 0)
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
    
    const [food, setFood] = useState(200);
    const [maxFood, setMaxFood] = useState(defaultFoodStorage);
    const [ammonium, setAmmonium] = useState(0);    
    const [maxAmmonium, setMaxAmmonium] = useState(10);
    const [nitrogenRunoff, setNitrogenRunoff] = useState(0);
    const [maxNitrogenRunoff, setMaxNitrogenRunoff] = useState(5);

    const [plantState, setPlantState] = useState({});
    const [foodSiloState, setFoodSiloState] = useState({});

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
    const [foodSiloVisible, setFoodSiloVisible] = useState(true);

    useEffect(() => {
        /*
        Currently only solution I know to fix rendering on state changes
        This is because state change causes a re-render of the component

        Dispatching the resize event fixes the canvas rendering,
        so it should be called after any state changes
        */
        window.dispatchEvent(new Event('resize'));
    }, [food, plantVisible, plantState, foodSiloVisible, foodSiloState])

    // ---------- GAME LOGIC ----------

    // add food every second
    useEffect(() => {
        setInterval(() => setFoodValidated( (old) => old + foodRateRef.current ), 1000);
    }, []);

    // update food production when plants change
    useEffect(() => {
        foodRateRef.current = calculateFoodPerMinute(plantState);
    }, [plantState])

    // update max food storage when food silos change
    useEffect(() => {
        setMaxFood(defaultFoodStorage + calculateFoodStorage(foodSiloState));
    }, [foodSiloState])

    // ---------- CALLBACKS ----------

    let plantVisibleTimeout = null;
    let foodSiloVisibleTimeout = null;

    const plantFound = useCallback(() => {
        clearTimeout(plantVisibleTimeout);
        setPlantVisible(true);
    }, []);

    const plantLost = useCallback(() => {
        window.dispatchEvent(new Event('resize'));
        clearTimeout(plantVisibleTimeout);
        plantVisibleTimeout = setTimeout(() => setPlantVisible(false), msToDisplayMenu);
    }, []);

    const foodSiloFound = useCallback(() => {
        clearTimeout(foodSiloVisibleTimeout);
        setFoodSiloVisible(true);
    }, []);

    const foodSiloLost = useCallback(() => {
        window.dispatchEvent(new Event('resize'));
        clearTimeout(foodSiloVisibleTimeout);
        foodSiloVisibleTimeout = setTimeout(() => setFoodSiloVisible(false), msToDisplayMenu);
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
        foodSiloState, setFoodSiloState,
        plantVisible, setPlantVisible,
        foodSiloVisible, setFoodSiloVisible,
    }

    const ARprops = {
        plantFound, plantLost,
        foodSiloFound, foodSiloLost,
    }

    const GUIprops = {
        ...currentState
    }

		
    // ---------- RENDER ----------

    return (
        <>
            <ModelContext.Provider value={{plantState, foodSiloState}}>
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
