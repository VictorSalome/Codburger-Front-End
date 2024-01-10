import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/UserContext'

import Person from '../../assets/profile.svg'
import Cart from '../../assets/cart.svg'

import paths from '../../constants/paths'

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
        push(paths.Login)
    }
    return (
        <Container>
            <ContainerLeft>
                <PageLink
                    onClick={() => push(paths.Home)}
                    isActive={pathname === paths.Home}>
                    Home
                </PageLink>
                <PageLink
                    onClick={() => push(paths.Products)}
                    isActive={pathname.includes(paths.Products)}>
                    Ver Produtos
                </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={() => push(paths.Cart)}>
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

