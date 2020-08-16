
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardDeck,
    CardColumns
} from 'reactstrap';

import ProductCard from '../ProductCard/ProductCard';

const ProductsPage = () => {

    const productCards = () => {
        let cards = [];

        for (let i = 0; i < 12; i++) {
            cards.push(
            <ProductCard
                key={i}
            />
            )
        }
        return cards;
    }

    return (
        <div className='products-page mt-5'>
            <CardDeck className='card-container'>
                {productCards()}                
            </CardDeck>

            {/* <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    md={{ size: 8, offset: 2 }}
                    lg={{ size: 6, offset: 3 }}
                >
                    <Card body>
                        <span>temp content</span>
                    </Card>
                </Col>
            </Row> */}
        </div>
    )
}

export default ProductsPage;





