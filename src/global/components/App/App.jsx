import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";

import {
	NavbarBrand,
	Navbar,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

import HomePage from '../HomePage/HomePage';
import LoginPage from '../../../examples/login-example/LoginPage';




const App = () => {

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<div className='app'>
		<Navbar color='dark' dark>
		<NavbarBrand href='/' >React Examples</NavbarBrand>
		<Dropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle caret>
				Dropdown
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem header>Examples</DropdownItem>
				<DropdownItem href='/'>Home</DropdownItem>
				<DropdownItem href='/login'>Login Example</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		</Navbar>
		<Switch>
			<Route path='/' exact component={HomePage} />
			<Route path='/login' component={LoginPage} />
		</Switch>
		</div>
	);
}

export default App;