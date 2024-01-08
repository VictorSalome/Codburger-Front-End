import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/UserContext'

import Person from '../../assets/profile.svg'
import Cart from '../../assets/cart.svg'

import {
    Container,
    ContainerLeft,
    ContainerRight,
    ContainerText,
    PageLink,
    Line,
    PageLinkExit
} from './styles'

export const Header = () => {
    const { push, location: { pathname } } = useHistory()
    const { logout, userData } = useUser()
    const logoutUser = () => {
        logout()
        push('/login')
    }
    return (
        <Container>
            <ContainerLeft>
                <PageLink
                    onClick={() => push('/')}
                    isActive={pathname === '/'}>
                    Home
                </PageLink>
                <PageLink
                    onClick={() => push('/produtos')}
                    isActive={pathname.includes('produtos')}>
                    Ver Produtos
                </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={() => push('/carrinho')}>
                    <img src={Cart} alt="carrinho" />
                </PageLink>
                <Line></Line>
                <PageLink>
                    <img src={Person} alt="perfil-logo" />
                </PageLink>
                <ContainerText>
                    <p>Olá, {userData.name}</p>
                    <PageLinkExit onClick={() => logoutUser()}>Sair</PageLinkExit>
                </ContainerText>
            </ContainerRight>
        </Container>

    )
}

