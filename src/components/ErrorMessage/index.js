import React from 'react'
import { ErrorMessageStyles } from './styles'
import PropTypes from 'prop-types'

export const ErrorMessage = ({ children }) => {

    return (
        <ErrorMessageStyles>{children}</ErrorMessageStyles>
    )
}


ErrorMessage.propTypes = {
    children: PropTypes.string
}

