import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/';
import { Container, LoginImage, ContainerItens, Label, Input, SignInLink, ErrorMessage } from './styles';
import LoginImg from '../../assets/login-image.svg';
import Logo from '../../assets/Logo.svg';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/UserContext';
import paths from '../../constants/paths';

export const Login = () => {
    const history = useHistory();
    const { putUserData } = useUser();
    const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async clientData => {
        try {
            const { data } = await api.post('sessions', {
                email: clientData.email,
                password: clientData.password
            });

            putUserData(data);

            toast.success('Seja bem-vindo(a)');

            setTimeout(() => {
                if (data.admin) {
                    history.push(paths.Order);

                } else {
                    history.push(paths.Home);
                }

            }, 1000);
        } catch (error) {
            toast.error('Erro ao fazer login. Verifique seu e-mail e senha');
        }
    };

    return (
        <Container>
            <LoginImage src={LoginImg} alt='login-image' />
            <ContainerItens>
                <img src={Logo} alt="logo-code-burger" />
                <h1>Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)} >
                    <Label>Email</Label>
                    <Input type='email'{...register('email')} error={errors.email?.message} />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label>Senha</Label>
                    <Input type='password'{...register('password')} error={errors.password?.message} />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Button type='submit' style={{ marginTop: 75, marginBottom: 25 }} >
                        Sign In
                    </Button>
                </form>
                <SignInLink>Não possui conta ? <Link style={{ color: 'white' }} to={paths.Register}>Sign Up</Link></SignInLink>
            </ContainerItens>
        </Container>
    );
};
