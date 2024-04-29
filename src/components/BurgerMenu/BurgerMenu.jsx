import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import {NavLink} from "react-router-dom";
import s from "../Header/Header.module.scss";
import {Dropdown} from "antd";
import {Arrow, Key, Person} from "../Header/Svgs";

const Menu = ({isOpen, setIsOpen, user, setModal}) => {
    const [isShowed, setIsShowed] = useState(false)


    return (
        <div onClick={setIsOpen} className={`${styles.bgModal} ${isOpen ? styles.active : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={`${styles.menuContainer} ${isOpen ? styles.activeModal : ""}`}>
               <div className={styles.header}>
                   <img src="https://i.ibb.co/f9LVt37/logo.jpg" alt="logo"/>
                   <button onClick={setIsOpen}>╳</button>
               </div>
                <div className={styles.links}>
                    <NavLink>
                        Товары
                    </NavLink>
                    <NavLink>
                        Отзывы
                    </NavLink>
                    <NavLink>
                        Новости
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
                        <Person/>
                        <p>Вход</p>
                    </div>
                    <div onClick={() => setModal("register")}>
                        <Key/>
                        <p>Регистрация</p>
                    </div>
                </div>}
                <div className={`${styles.hided} ${isShowed ? styles.showed : ""}`}>
                    <NavLink>
                        Пополнить
                    </NavLink>
                    <NavLink>
                        Мои пополнения
                    </NavLink>
                    <NavLink>
                        Партнерская программа
                    </NavLink>
                    <NavLink>
                        Мои покупки
                    </NavLink>
                    {user?.status === "admin" ? <>
                        <NavLink>Список продуктов</NavLink>
                        <NavLink>Реквизиты</NavLink>
                        <NavLink>Отзывы</NavLink>
                        <NavLink>Пользователи</NavLink>
                        <NavLink>Категории</NavLink>
                    </> : null}
                </div>
            </div>
        </div>
    );
};

export default Menu;