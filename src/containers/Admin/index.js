import React from 'react'

import Orders from './Orders'
import { Container } from './styles'
import { SideMenuAdmin } from '../../components'

export const Admin = () => {
    return (
        <Container>
            <SideMenuAdmin />
            <Orders />
        </Container>
    )
}

