import React from 'react';
import {Redirect} from 'react-router-dom';
import {
    Card,
    Row,
    Col,
} from 'reactstrap';

import getLoggedInUser from '../helpers/userAccountHelpers/getLoggedInUser';

const LoggedInPage = () => {


    // redirects non logged in user to log in page
    if(getLoggedInUser() === null) {
        return (
            <Redirect
            to='/login-example'/>
        )
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
                        <div>
                            You are now logged in.
                            <br />
                            Click profile image in the top right to log out or delete your account.
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoggedInPage;