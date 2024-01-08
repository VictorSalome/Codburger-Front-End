import React from 'react'

import { useCart } from '../../hooks/CartContext'

import { Container, Header, Body, EmptyCart } from './styles'
import formatCurrency from '../../utils/formatCurrency'




export const CartItems = () => {

  const { cartProducts, increseProducts, decreseProducts } = useCart()

  return (
    <Container>
      <Header>
        <p></p>
        <p>Itens</p>
        <p>Preço</p>
        <p style={{ paddingRight: '20px' }}>Quantidade</p>
        <p>Total</p>
      </Header>

      {cartProducts && cartProducts.length === 0 ? <EmptyCart>Carrinho vazio</EmptyCart> :
        cartProducts.map(product => (
          <Body key={product.id}>
            <img src={product.url} alt='imagem do item' />
            <p>{product.name}</p>
            <p>{formatCurrency(product.price)}</p>
            <div className='quantity-container'>
              <button onClick={() => decreseProducts(product.id)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => increseProducts(product.id)}>+</button>
            </div>
            <p>{formatCurrency(product.quantity * product.price)}</p>
          </Body>

        ))}
    </Container>

  )
}

