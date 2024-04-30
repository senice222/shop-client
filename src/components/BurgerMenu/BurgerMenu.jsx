import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { NavLink } from "react-router-dom";
import { Key, Person } from "../Header/Svgs";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';

const Menu = ({ isOpen, setIsOpen, user, setModal }) => {
    const [isShowed, setIsShowed] = useState(false)
    const dispatch = useDispatch()


    return (
        <div onClick={setIsOpen} className={`${styles.bgModal} ${isOpen ? styles.active : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={`${styles.menuContainer} ${isOpen ? styles.activeModal : ""}`}>
                <div className={styles.header}>
                    <img src="https://i.ibb.co/f9LVt37/logo.jpg" alt="logo" />
                    <button onClick={setIsOpen}>╳</button>
                </div>
                <div className={styles.links}>
                    <NavLink to={"/"}>
                        Товары
                    </NavLink>
                    <NavLink to={"/reviews"}>
                        Отзывы
                    </NavLink>
                    <NavLink>
                        Поддержка
                    </NavLink>
                </div>
                <hr />
                {user ? <div className={styles.profile}>
                    <div className={styles.leftDiv}>
                        <h2 className={styles.name}>{user.login}</h2>
                        <p>0 RUB</p>
                    </div>
                    <div onClick={() => setIsShowed(!isShowed)} className={styles.openBtn}>
                        <p>▼</p>
                    </div>
                </div> : <div className={styles.vhodvihod}>
                    <div onClick={() => setModal("login")}>
                        <Person />
                        <p>Вход</p>
                    </div>
                    <div onClick={() => setModal("register")}>
                        <Key />
                        <p>Регистрация</p>
                    </div>
                </div>}
                <div className={`${styles.hided} ${isShowed ? styles.showed : ""}`}>
                    <NavLink to="/purchases">
                        Мои покупки
                    </NavLink>
                    <NavLink>
                        Партнерская программа
                    </NavLink>
                    {
                        user && <a onClick={() => dispatch(logout())}>
                            Выход
                        </a>
                    }
                    {user?.status === "admin" ? <>
                        <NavLink to="/products/list">
                            Список продуктов
                        </NavLink>
                        <NavLink to="/requisites">
                            Реквизиты
                        </NavLink>
                        <NavLink to="/comments">
                            Отзывы
                        </NavLink>
                        <NavLink to="/categories/list">
                            Категории
                        </NavLink>
                    </> : null}
                </div>
            </div>
        </div>
    );
};

export default Menu;