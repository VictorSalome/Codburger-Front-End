
import { ContainerButton } from './styles'

import PropTypes from 'prop-types'

export const Button = ({ children, ...rest }) => {

    return (
        <ContainerButton {...rest} >{children}</ContainerButton>
    )
}

Button.propTypes = {
    children: PropTypes.string
}