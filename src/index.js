import React from 'react';
import { createRoot } from 'react-dom/client';

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";

import './main.css';
const container = document.getElementById('app');
const root = createRoot(container); 

root.render(
	<React.StrictMode>
	<>
		<div className='ui'>
			<h1 className='title'>NitroCycle</h1>
		</div>
  	<ARCanvas camera={ { position: [0, 0, 0] } }
  	  onCreated={ ({ gl }) => {
   	   gl.setSize(window.innerWidth, window.innerHeight)
   	 } }>
   		<ambientLight />
			<pointLight position={ [10, 10, 0] }  />
			<ARMarker type={ "pattern" } 
								patternUrl={ "data/hiro.patt" }>
   	  	<mesh>
   	    	<boxBufferGeometry args={ [1, 1, 1] } />
   	    	<meshStandardMaterial color={ "green" } />
   	  	</mesh>
			</ARMarker>
		</ARCanvas>
	</>
	</React.StrictMode>,
  document.getElementById("root")
);
