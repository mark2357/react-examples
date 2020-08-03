import React from 'react';

import {
    Card,
    Row,
    Col,
    Jumbotron,
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
                        <span>
                        This Website is a showcase of various webpage examples
                        This webpage was created using a combination of the following systems:
                        </span>
                        <ul>
                        <li>React</li>
                        <li>Bootstrap</li>
                        <li>Webpack</li>                    
                        </ul>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default HomePage;