import React from 'react';

import {
    Card,
    CardBody,
    CardHeader,
    CardImg,
    CardText
} from 'reactstrap';
import ProductsPage from '../ProductsPage/ProductsPage';


const ProductCard = () => {


    return (
        <Card className='product-card m-0'>
            <CardImg src='/assets/placeholder image 480x270.jpg'/>
            <CardBody>
            <CardText>
                testing 123
            </CardText>
            </CardBody>
        </Card>
        )

}

export default ProductCard;