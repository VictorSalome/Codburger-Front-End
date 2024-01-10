import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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


]

export default listLinks