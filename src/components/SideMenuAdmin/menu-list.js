import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import paths from '../../constants/paths';

const listLinks = [

    {
        id: 1,
        label: 'Pedidos',
        link: paths.Order,
        icon: ShoppingBagIcon,
    },
    {
        id: 2,
        label: 'Listar Produtos',
        link: paths.ProductsList,
        icon: ShoppingBagIcon,
    },
    {
        id: 3,
        label: 'Novo produto',
        link: paths.NewProduct,
        icon: AddShoppingCartIcon,
    },


]

export default listLinks