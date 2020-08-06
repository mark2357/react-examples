import React from 'react';
import {Redirect} from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Button,
    CardFooter,
} from 'reactstrap';

import getLoggedInUser from '../helpers/getLoggedInUser';
import setLoggedInUser from '../../../examples/login-example/helpers/setLoggedInUser';

const LoggedInPage = () => {

    // redirects non logged in user to log in page
    if(getLoggedInUser() === null) {
        return (
            <Redirect
            to='/login-example'/>
        )
    }

    const handleLogoutUser = () => {
        setLoggedInUser(null);
		window.location.href = '/login-example';
    }

    return (
        <div className='logged-in-page mt-5'>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    md={{ size: 6, offset: 3 }}
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='forgotPassword-card' color='dark' inverse body>
                        <span>
                            you are now logged in.
                            <br />
                            Click the button below or the profile image in the top right to log out
                        </span>
                        <CardFooter>
                            <Button onClick={handleLogoutUser} color='primary'>Log Out</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoggedInPage;