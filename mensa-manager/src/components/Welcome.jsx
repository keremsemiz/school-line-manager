import React, { useRef, useEffect, useState } from 'react';
import './Welcome.css'

function Welcome(){


    return(
        <div classname="container">
            <div className="header">
                <p className='headerText'>Made by Kerem & Vibbodh 10d</p>
                <p className='headerText'>Wednesday, June 26th</p>
            </div>
            <h2 className='Title'>Welcome to the NMS Cafeteria Manager</h2>
            <p>Please wait 5 seconds to get started</p>
        </div>
    );
}
export default Welcome