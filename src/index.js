import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App.jsx';

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

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
);


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'));