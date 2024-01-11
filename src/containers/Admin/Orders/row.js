import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProductsImg, ReactSelectStyled } from './styles';
import api from '../../../services/api';
import status from './order-status';
import formatCurrency from '../../../utils/formatCurrency';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';


const Row = ({ row, setOrders, orders }) => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const setNewStatus = async (id, status) => {
        setIsLoading(true)
        try {
            await api.put(`orders/${id}`, { status })
            const newOrders = orders.map(order => {
                return order._id === id ? { ...order, status } : order
            })
            setOrders(newOrders)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const calculateTotalPrice = (row) => {
        let totalPrice = 0;
        row.products.forEach((product) => {
            totalPrice += product.price;
        });
        return totalPrice;
    };

    const totalPrice = calculateTotalPrice(row);




    const cancelOrder = () => {

        setNewStatus(row.orderId, 'Cancelado');

        toast.info('Pedido cancelado', {
            autoClose: 2000
        });

        setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }, 3000);


    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>

                <TableCell>
                    <ReactSelectStyled options={status.filter(option => option.value !== 'Todos')}
                        menuPortalTarget={document.body}
                        placeholder="Status"
                        defaultValue={
                            status.find((option) => option.value === row.status) || null
                        }
                        onChange={(newStatus) =>
                            setNewStatus(row.orderId, newStatus.value)
                        }
                        isLoading={isLoading}
                    />
                </TableCell>
                <TableCell>{formatCurrency(totalPrice)}</TableCell>
                <TableCell>
                    <CloseIcon
                        onClick={cancelOrder}
                        style={{ cursor: 'pointer', marginLeft: '40px' }}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Pedido
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Categoria</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((productRow) => (
                                        <TableRow key={productRow.id}>
                                            <TableCell component="th" scope="row">
                                                {productRow.quantity}
                                            </TableCell>
                                            <TableCell>{productRow.name}</TableCell>
                                            <TableCell>{productRow.category}</TableCell>
                                            <TableCell>
                                                <ProductsImg src={productRow.url} alt="imagem-do-produto" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    setOrders: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        orderId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                quantity: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default Row