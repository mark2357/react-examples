import React from 'react';
import ReactDOM from 'react-dom';
import App from './global/components/App/App';

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from "react-router-dom";

import './main.scss'

//load font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    // faChevronLeft,
    // faChevronRight,
    // faChevronUp,
    // faChevronDown,
    // faTimes,
    // faPlus,
    // faMinus,
    // faEdit,
    // faSave,
    // faTrashAlt,
    // faCog,
    faEye,
    faEyeSlash,
    // faCamera,
    // faSyncAlt,
    // faEllipsisH,
    faCheckCircle,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
library.add(
    // faChevronLeft,
    // faChevronRight,
    // faChevronUp,
    // faChevronDown,
    // faTimes,
    // faPlus,
    // faMinus,
    // faEdit,
    // faSave,
    // faTrashAlt,
    // faCog,
    faEye,
    faEyeSlash,
    // faCamera,
    // faSyncAlt,
    // faEllipsisH,
    faCheckCircle,
    faTimesCircle
);


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'));