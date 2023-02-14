import React from 'react';

import '../../farmers-log-styles.css';

function Ammonium(props) {

    return (
            <ul>
                <h1>Ammonium</h1>
                <p>Ammonium is used by farmers as a fertilizer, either in the form of ammonium nitrate or ammonium sulfate, to provide nitrogen for plant growth. It is also used as an ingredient in some herbicides, as a microbial growth enhancer in animal feed, and as an acidity regulator in soil. You can use Ammonium to upgrade plants and keep them from dying.</p>
                <button className='escape' onClick={props.update("Home")}>
                        <h4>Home</h4>
                </button>
            </ul>
    );
}

export default Ammonium;
