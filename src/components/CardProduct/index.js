import React from 'react';
import PropTypes from 'prop-types'
import { useCart } from '../../hooks/CartContext'
import { useHistory } from 'react-router-dom'
import {
    Container,
    DivMain,
    Image,
    ProductContainer,
    ProductName,
    ProductPrice,


} from './styles.js'

import { Button } from '../Button';


export const CardProduct = ({ product }) => {

    const { push } = useHistory()
    const { putProductInCart } = useCart()
    return (
        <Container>
            <Image src={product.url} alt='imagem do produto' />
            <DivMain>
                <ProductContainer>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>{product.formatedPrice}</ProductPrice>
                </ProductContainer>
                <Button onClick={() => {
                    putProductInCart(product)
                    push('/carrinho')
                }}>Adicionar</Button>
            </DivMain>
        </Container>
    );
};

CardProduct.propTypes = {
    product: PropTypes.object
}