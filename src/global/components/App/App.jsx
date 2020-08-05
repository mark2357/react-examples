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
import LoginPage from '../../../examples/login-example/LoginPage/LoginPage';
import ForgotPasswordPage from '../../../examples/login-example/ForgotPasswordPage/ForgotPasswordPage';
import LoggedInPage from '../../../examples/login-example/LoggedInPage/LoggedInPage';

const App = () => {

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<div className='app'>
			<div className='background-div'/>
			<Navbar color='dark' dark>
			<NavbarBrand href='/' >React Examples</NavbarBrand>
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret>
					Dropdown
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem header>Examples</DropdownItem>
					<DropdownItem href='/'>Home</DropdownItem>
					<DropdownItem href='/login-example'>Login Example</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			</Navbar>
			<Switch>
				<Route path='/' exact component={HomePage}/>
				<Route path='/login-example' exact component={LoginPage}/>
				<Route path='/login-example/forgot-password' component={ForgotPasswordPage}/>
				<Route path='/login-example/logged-in' component={LoggedInPage}/>
			</Switch>
		</div>
	);
}

export default App;