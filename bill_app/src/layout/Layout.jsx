import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchTransactions } from '../redux/customerSlice';


const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/home");
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/transactions/get`)
                dispatch(fetchTransactions([...data.data]))
            } catch (err) {

            }
        }
        if (window.location.pathname === "/transactionHistory" || window.location.pathname === "/home") { fetchData(); }
    }, [window.location.pathname])

    return (
        <div className="d-flex">

            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div
                className="flex-grow-1"
                style={{
                    marginLeft: isSidebarOpen ? '210px' : '55px',
                    transition: 'margin-left 0.3s ease',
                    width: '100%',
                    padding: '10px'
                }}
            >
                <Outlet />
            </div>
        </div>

    )
}

export default Layout