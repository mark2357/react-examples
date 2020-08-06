import React from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    Row,
    Col,
    CardTitle,
} from 'reactstrap';


const HomePage = () => {
    return (
        <div className='home-page mt-5'>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    md={{ size: 8, offset: 2 }}
                    lg={{ size: 6, offset: 3 }}
                >
                    <Card body className ='homepage-card' inverse color='dark'>
                        <div>This Website is a showcase of various frontend webpage examples</div>
                        <div>This webpage was created using a combination of the following systems:</div>
                        <ul>
                            <li>React</li>
                            <li>Bootstrap</li>
                            <li>Webpack</li>                    
                        </ul>
                        <div>
                            As this webpage doesn&apos;t have any backend
                            as it&apos;s only contains frontend examples
                            some systems use workarounds to implement
                            functionality e.g.the login system
                        </div>
                    </Card>
                    <Card body className ='homepage-card mt-5' inverse color='dark'>
                        <CardTitle>
                        <Link to='/login-example'>Login Example</Link>
                        </CardTitle>
                        <div>contains functionality for logging in, registering and resetting your password</div>
                        <div>
                            Please note that as this is a front end example this website stores registration data in local storage.
                            This is a design patten I would <b>NOT</b> use in a real world solution.
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default HomePage;