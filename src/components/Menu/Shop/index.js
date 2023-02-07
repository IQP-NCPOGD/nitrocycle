import React, { useState } from 'react';
import { menus, setActiveMenu } from '..';

import './styles.css';


export default function Shop(props) {

    return (
        <div className='shop-main'>
            <div className='controls'>
                <button onClick={() => setActiveMenu(menus.none)}>Close</button>
            </div>
            <div>
                <p>This is the shop page</p>
                <ul>
                    <li>
                        <button>Purchase Ammonium (10 food)</button>
                    </li>
                    <li>
                        <button>Purchase Food</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
