import React, {useState} from 'react';

import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getLoggedInUser from '../../../examples/login-example/helpers/getLoggedInUser';
import setLoggedInUser from '../../../examples/login-example/helpers/setLoggedInUser';



const LoginNavbarContent = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const loggedInUser = getLoggedInUser();

    const handleLogout = () => {
		setLoggedInUser(null);
		window.location.href = '/login-example';
	}
    
    if (loggedInUser === null)
        return null;


    return (
        <div className='login-navbar-content'>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle tag='span'>
                    <FontAwesomeIcon className='user-icon' icon='user-circle' />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header>{loggedInUser}</DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default LoginNavbarContent;