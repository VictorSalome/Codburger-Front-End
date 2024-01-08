import React from 'react'

import HomeLogo from '../../assets/home-logo.svg'

import { Container, HomeImg } from './styles'
import { CategoryCarousel, OffersCarousel } from '../../components/'



export const Home = () => {
    return (
        <Container>
            <HomeImg src={HomeLogo} alt=' logo Home' />
            <CategoryCarousel />
            <OffersCarousel />
        </Container>

    )
}

