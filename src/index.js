import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
	<ARCanvas	camera={ { position: [0, 0, 0] } }
    					onCreated={ ({ gl }) => {
      					gl.setSize(window.innerWidth, window.innerHeight)
    					} } >
    	<ambientLight />
    	<pointLight position={ [10, 10, 0] }  />
			<ARMarker	type={ "pattern" } patternUrl={ "data/hiro.patt" }>
      	<mesh>
        	<boxBufferGeometry args={ [1, 1, 1] } />
        	<meshStandardMaterial color={ "green" } />
      	</mesh>
    	</ARMarker>
		</ARCanvas>

  <React.StrictMode>
  	<App />
  </React.StrictMode>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
