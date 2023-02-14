import React from 'react';

import '../../farmers-log-styles.css';

function PotatoPlant(props) {

    return (
            <ul>
                <h1>Potato Plant</h1>
                <p>A potato plant is an herbaceous perennial plant from the nightshade family, Solanaceae. It is an annual or perennial herbaceous plant that grows up to one meter in height, with a large underground tuber. The potato plant is native to the Andes mountains in South America and has been cultivated for centuries as a major source of food.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default PotatoPlant;
