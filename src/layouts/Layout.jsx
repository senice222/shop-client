import React, {useEffect} from 'react'
import { Header } from '../components/Header/Header'
import style from './Layout.module.scss'
import { Outlet } from 'react-router-dom'
import {fetchAuthMe} from "../store/slices/userSlice";
import {useDispatch} from "react-redux";
import { Footer } from '../components/Footer/Footer';
const Layout = ({children}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])
    return (
        <div className={style.wrapper}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout