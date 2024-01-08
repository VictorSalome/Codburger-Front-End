import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    const putUserData = userInfo => {
        setUserData(userInfo)

        localStorage.setItem('codeburger:userData', JSON.stringify(userInfo))

    }

    const logout = () => {
        localStorage.removeItem('codeburger:userData')
    }


    useEffect(() => {
        const loadUserData = () => {
            const clientInfo = localStorage.getItem('codeburger:userData')

            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }
        }
        loadUserData()

    }, [])

    return (
        <UserContext.Provider value={{ putUserData, userData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used with UserContext');
    }

    return context;
};


UserProvider.propTypes = {
    children: PropTypes.node
};
