import React, { useEffect, useState } from 'react'

import { Container, LinkMenu, Menu } from './styles'
import api from '../../../services/api'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import Row from './row';
import formatDate from '../../../utils/formartDate';
import status from './order-status';






const Orders = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [activeStatus, setActiveStatus] = useState(1)
    const [rows, setRows] = useState([])




    useEffect(() => {
        const loadOrders = async () => {
            const { data } = await api.get('orders')
            setOrders(data)
        }
        loadOrders()

    }, [])


    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: formatDate(order.createdAt),
            status: order.status,
            products: order.products
        };
    }

    useEffect(() => {

        const newRows = filteredOrders.map(order => createData(order))
        setRows(newRows)

    }, [filteredOrders])

    useEffect(() => {
        if (activeStatus === 1) {
            setFilteredOrders(orders)
        } else {
            const statusIndex = status.findIndex(status => status.id === activeStatus)
            const newFilteredOrders = orders.filter(
                order => order.status === status[statusIndex].value)
            setFilteredOrders(newFilteredOrders)
        }



    }, [orders, activeStatus])

    const handleStatus = (status) => {
        if (status.id === 1) {
            setFilteredOrders(orders)

        } else {
            const newOrders = orders.filter(order => order.status === status.value)
            setFilteredOrders(newOrders)
        }
        setActiveStatus(status.id)

    }


    return (
        <Container>
            <Menu>
                {status && status.map(status => (
                    <LinkMenu key={status.id}
                        onClick={() => handleStatus(status)}
                        isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                    </LinkMenu>
                ))}
            </Menu>



            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Data do pedido</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Total do pedido</TableCell>
                            <TableCell>Cancelar pedido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.orderId} row={row} setOrders={setOrders} orders={orders} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Orders