import React from 'react';

import {
    Card,
    Row,
    Col,
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
                        <br />
                        <div>As this webpage doesn&apos;t have any backend as it&apos;s only contains frontend examples some systems use workarounds to implement functionality e.g.the login system</div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default HomePage;