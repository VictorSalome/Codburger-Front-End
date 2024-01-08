import BackgroundImage from '../../assets/background.svg'

import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: url('${BackgroundImage}');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

`

export const LoginImage = styled.img`
   height: 70%;

`
export const ContainerItens = styled.div`
    background: #474747;
    border-radius: 0 10px 10px 0;
    height: 70%;
    padding: 25px 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    form {
        display:flex;
        flex-direction: column;
    }

    h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #ffff;
    text-align: center;
    margin-top: 100px;


    }

`
export const Label = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #ffff;
    margin-top: 28px;
    margin-bottom: 5px;


`
export const Input = styled.input`
    width: 391.42px;
    height: 38.32px;
    background-color: #ffff;
    box-shadow: 3px 3px 10px;
    border-radius: 5px;
    border: ${props => (props.error ? '2px solid #CC1717' : 'none')};
    padding-left: 10px;


`
export const Button = styled.button`
    width: 182.81px;
    height: 36.13px;
    background: #9758a6;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #eeeeee;
    margin-top: 75px;
    margin-bottom: 25px;

    &:hover {
        opacity: 0.8
    }
    &:active {
        opacity: 0.6
    }


`
export const SignInLink = styled.p`
    font-style: normal;
    font-weight: 300px;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;

    a {
        cursor: pointer;
        text-decoration: underline;
    }



`
export const ErrorMessage = styled.p`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
color: #CC1717;
margin-top: 2px;

`



