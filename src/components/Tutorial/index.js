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
	<p > { props.dialogue } </p>
		<img className="hans" src="/data/images/hansAmmonium.png" />
	</div>;
}
export function JohnDialogue(props) {
	return <div className="dialogue">
		<img className="john" src="/data/images/johnFarmer.png" />
	<p > { props.dialogue } </p>
	</div>;
}

const stages = [
	<HansDialogue dialogue="welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here?" />,
	<JohnDialogue dialogue="welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here? welcome john nice to meet you. what brings you here?" />
]

export default function Tutorial(props) { 
	let [ stage, setStage ] = useState(0);

	return <div className="tutorial" onClick={() => setStage(stage++)}>
		{ (stage < stages.length) ? stages[stage] : undefined }
	</div>;
}
