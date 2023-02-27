import React, { useEffect, useState } from "react"
/*
import FarmersLog from "./FarmersLog/FarmersLog";
import Shop from "./Shop";
import Trivia from "./Trivia/Trivia";
import PlantMenu from "./PlantMenu";
*/

import './styles.css';


export function HansDialogue(props) {
	return <div className="dialogue">
		<p > {props.dialogue} </p>
		<div>
			<img className="hans" src="data/images/hansAmmonium.png" />
			<p>Hans Ammonium</p>
		</div>
	</div>;
}
export function JohnDialogue(props) {
	return <div className="dialogue">
		<div>
			<img className="john" src="data/images/johnFarmer.png" />
			<p>John Farmer</p>
		</div>
		<p > {props.dialogue} </p>
	</div>;
}

const introScene = [
	<JohnDialogue dialogue="Welcome to your farm." />,
	<JohnDialogue dialogue="There is a lot of work to be done if we want to feed this town." />,
	<JohnDialogue dialogue="Start by planting a sprout. Scan the plant marker and open the plant menu." />,
]

const placedPlantScene = [
	<JohnDialogue dialogue="Good work!" />,
	<JohnDialogue dialogue="The sprout you planted will produce food to help us feed the town." />,
	<JohnDialogue dialogue="You can plant more to speed up food production." />,
	<JohnDialogue dialogue="Try placing two more plants." />,
]

const placedThreePlantsScene = [
	<JohnDialogue dialogue="Good work! Now you have a small farm going." />,
	<JohnDialogue dialogue="You are going to need food silos to store all of the food. Scan a food silo marker and buy a food silo." />,
]

const placedFoodSiloScene = [
	<JohnDialogue dialogue="Good job! This food silo will allow us to store even more food so we can feed the town." />,
	<JohnDialogue dialogue="You now know the basics. Try and plant more crops, and once you get enough food check out the shop to unlock the next level." />,
	<JohnDialogue dialogue="Also, remember to check out the new Farmer's Log pages you unlocked and to do the trivia questions. Trivia questions will give you free rewards to help speed up your farm." />,
]

const levelOneScene = [
	<JohnDialogue dialogue="Congratulations on feeding 100 people! You are now able to upgrade your food silos, and can begin storing ammonium. You can use ammonium to fertilize your sprouts into blooms to produce even more food." />,
	<JohnDialogue dialogue="The only question is, where will we get ammonium from?" />,
	<HansDialogue dialogue="Hello, John Farmer." />,
	<JohnDialogue dialogue="Who are you?" />,
	<HansDialogue dialogue="My name is Hans Ammonium, and I heard you need ammonium to fertilze your crops." />,
	<HansDialogue dialogue="If you would like to get your hands on some ammonium, you will have to purchase it from me." />,
	<JohnDialogue dialogue="Well, it looks like we have no choice but to purchase ammonium from Hans Ammonium. Check out the shop to buy from him. Remember, you will need ammonium silos to store the ammonium first. I will see you later." />,
]

const placedAmmoniumSiloScene = [
	<JohnDialogue dialogue="Congratulations on placing your ammonium silo! You can now store ammonium." />,
	<JohnDialogue dialogue="Be careful, however. Your ammonium silos will need maintenance every now and then. You can maintain them from this menu. A notification will appear when you need to maintain them. Good luck!" />,
]

const fertilizedPlantScene = [
	<JohnDialogue dialogue="Excellent. You fertilized your first plant!" />,
	<JohnDialogue dialogue="The blooming potato plant will now produce a lot more food. However, there is something important I should mention..." />,
	<JohnDialogue dialogue="By fertilizing plants, you produce some nitrogen runoff. Try and keep the nitrogen runoff below the maximum level, or else the farm may get shut down by the government." />,
]

const levelTwoScene = [
	<JohnDialogue dialogue="Good work! You have fed 1000 people! Our town is thankful for your farm." />,
	<JohnDialogue dialogue="You have now unlocked nitrogen fixators. These machines will perform nitrogen fixation so we can produce our own ammonium!" />,
	<JohnDialogue dialogue="Once we start making our own ammonium, we will no longer have to buy from Hans Ammonium." />,
	<HansDialogue dialogue="I think you should just keep buying ammonium from me." />,
	<JohnDialogue dialogue="We will see about that." />,
	<JohnDialogue dialogue="Scan a nitrogen fixator marker if you would like to build one so we can start making ammonium." />,
]

const placedNitrogenFixatorScene = [
	<JohnDialogue dialogue="Very good! We are now producing our own ammonium." />,
	<JohnDialogue dialogue="Building this nitrogen fixator produced some nitrogen runoff as well. Always make sure to keep an eye on your nitrogen runoff levels. Good luck!" />,
]

const levelThreeScene = [
	<JohnDialogue dialogue="Amazing job! Your farm is now feeding 10,000 people. Our town is no longer struggling thanks to all the food we have available now." />,
	<JohnDialogue dialogue="Keep up the good work." />,
]

const levelFourScene = [
	<JohnDialogue dialogue="You've done it! Your farm has fed over 100,000 people. Now our entire country is being fed, all thanks to your work." />,
	<JohnDialogue dialogue="You have unlocked the final level. Congratulations on completing this game!" />,
]

export const scenes = {
	intro: introScene,
	firstPlant: placedPlantScene,
	thirdPlant: placedThreePlantsScene,
	firstFoodSilo: placedFoodSiloScene,
	levelOne: levelOneScene,
	firstAmmoniumSilo: placedAmmoniumSiloScene,
	firstFertilize: fertilizedPlantScene,
	levelTwo: levelTwoScene,
	firstNitrogenFixator: placedNitrogenFixatorScene,
	levelThree: levelThreeScene,
	levelFour: levelFourScene,

}

export let setCurrentScene = undefined;

export default function Tutorial(props) {
	let [ scene, setScene ] = useState(scenes.intro);
	let [ stage, setStage ] = useState(0);

	setCurrentScene = (newScene) => {
		setScene(newScene);
		setStage(0);
	}

	return <div className="tutorial" onClick={() => setStage(stage++)} style={{zIndex: ((stage < scene.length) ? 100 : -10)}}>
		{ (stage < scene.length) ? scene[stage] : undefined }
	</div>;
}
