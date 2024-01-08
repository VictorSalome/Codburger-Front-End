import React from 'react'

import CartLogo from '../../assets/Cart-Image.svg'

import { Container, CartImg, Wrapper } from './styles'
import { CartItems, CartResume } from '../../components/'



export const Cart = () => {
    return (
        <Container>
            <CartImg src={CartLogo} alt=' logo do carrinho' />
            <Wrapper>
                <CartItems />
                <CartResume />
            </Wrapper>
        </Container>

    )
}

