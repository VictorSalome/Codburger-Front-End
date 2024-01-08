import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])


    const updateLocalStorage = products => {
        localStorage.setItem('codeburger:cartInfo', JSON.stringify(products))
    }

    const putProductInCart = product => {
        const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

        let newCartProducts = cartProducts
        if (cartIndex >= 0) {
            newCartProducts = cartProducts

            newCartProducts[cartIndex].quantity = newCartProducts[cartIndex].quantity + 1
            setCartProducts(newCartProducts)
        }
        else {
            product.quantity = 1
            newCartProducts = [...cartProducts, product]
            setCartProducts(newCartProducts)
        }
        updateLocalStorage(newCartProducts)


    }

    const deleteProducts = async ProductId => {
        const newCart = cartProducts.filter(product => product.id !== ProductId)

        setCartProducts(newCart)
        localStorage.setItem('codeburger:cartInfo', JSON.stringify(newCart))
    }

    const increseProducts = async ProductId => {

        const newCart = cartProducts.map(product => {
            return product.id === ProductId ? { ...product, quantity: product.quantity + 1 } : product

        })
        setCartProducts(newCart)

        updateLocalStorage(newCart)
    }

    const decreseProducts = async ProductId => {
        const cartIndex = cartProducts.findIndex(pd => pd.id === ProductId)


        if (cartProducts[cartIndex].quantity > 1) {
            const newCart = cartProducts.map(product => {
                return product.id === ProductId ? { ...product, quantity: product.quantity - 1 } : product
            })
            setCartProducts(newCart)
            updateLocalStorage(newCart)
        } else {
            deleteProducts(ProductId)
        }
    }

    useEffect(() => {
        const loadUserData = () => {
            const clientCartData = localStorage.getItem('codeburger:cartInfo')

            if (clientCartData) {
                setCartProducts(JSON.parse(clientCartData))
            }
        }
        loadUserData()

    }, [])

    return (
        <CartContext.Provider value={{ putProductInCart, cartProducts, increseProducts, decreseProducts }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used with UserContext');
    }

    return context;
};


CartProvider.propTypes = {
    children: PropTypes.node
};
