import React, { useState } from 'react';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import {
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
import ExampleWebsiteWarningModal from '../ExampleWebsiteWarningModal/ExampleWebsiteWarningModal';
import LoginNavbarContent from '../../../examples/login-example/LoginNavbarContent/LoginNavbarContent';
import ChangePasswordPage from '../../../examples/login-example/ChangePasswordPage/ChangePasswordPage';
import ProductsPage from '../../../examples/store-example/ProductsPage/ProductsPage';

const App = () => {

	const [dropdownLeftOpen, setDropdownLeftOpen] = useState(false);

	const toggleDropdownLeft = () => setDropdownLeftOpen(prevState => !prevState);
	const history = useHistory();

	return (
		<div className='app'>
			<ExampleWebsiteWarningModal />
			<div className='background-div'/>
			<Navbar color='dark' dark>
			<Dropdown isOpen={dropdownLeftOpen} toggle={toggleDropdownLeft}>
				<DropdownToggle caret>
					React Examples
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={() => {history.push('/'); }}>
							Home
					</DropdownItem>
					<DropdownItem onClick={() => {history.push('/login-example/register'); }}>
						Login Example
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			{/* switch for content within navbar */}
			<Switch>
				<Route path='/login-example' component={LoginNavbarContent}/>
			</Switch>
			</Navbar>

			{/* switch for main page content */}
			<Switch>
				<Route path='/' exact component={HomePage}/>


				{/* login example routes */}
				<Route path='/login-example' exact render={() => <Redirect to='/login-example/login'/>}/>
				<Route path='/login-example/login' exact render={
					() => <LoginPage loginActiveTab={true}/>
				}/>
				<Route path='/login-example/register' exact render={
					() => <LoginPage loginActiveTab={false}/>
				}/>
				<Route path='/login-example/forgot-password' component={ForgotPasswordPage}/>
				<Route path='/login-example/logged-in' component={LoggedInPage}/>
				<Route path='/login-example/change-password' exact component={ChangePasswordPage}/>


				{/* store example routes */}
				<Route path='/store-example/products-page' exact component={ProductsPage}/>

			</Switch>
		</div>
	);
}

export default App;