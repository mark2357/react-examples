import React from 'react';

import {
    Card,
    Row,
    Col,
} from 'reactstrap';


const LoggedInPage = () => {



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
                        <span>successfully logged in</span>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoggedInPage;