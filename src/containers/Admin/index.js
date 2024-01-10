import React from 'react'

import Orders from './Orders'
import { Container, ContainerItems } from './styles'
import { SideMenuAdmin } from '../../components'
import ListProducts from './ListProducts'

import PropTypes from 'prop-types'
import paths from '../../constants/paths'




export const Admin = ({ match: { path } }) => {





    return (
        <Container>
            <SideMenuAdmin />
            <ContainerItems>
                {path === paths.Order && <Orders />}
                {path === paths.ProductsList && <ListProducts />}
            </ContainerItems>
        </Container>
    )
}


Admin.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string

    })
}
