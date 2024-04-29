import s from "./Header.module.scss";
import {Person, Key, Arrow} from "./Svgs";
import {NavLink} from 'react-router-dom'
import {AuthModal} from "../Modals/LoginAndRegisterModal/Modal";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Dropdown} from "antd";
import {Poplnenie} from "../Modals/Popolnit/Poplnenie";
import Menu from "../BurgerMenu/BurgerMenu";


export const Header = () => {
    const [modal, setModal] = useState(null)
    const [popolnenie, setPopolnenie] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector(state => state.user).data

    const items = [
        {
            key: '1',
            label: (
                <div className={s.itemLink} onClick={() => setPopolnenie((item) => !item)}>
                    <a>
                        Пополнить
                    </a>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className={s.itemLink}>
                    <NavLink to="/purchases">
                        Мои покупки
                    </NavLink>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className={s.itemLink}>
                    <NavLink to="https://www.antgroup.com">
                        Выйти
                    </NavLink>
                </div>
            ),
        },
    ];

    if (user && user.status === "admin") {
        items.push(
            {
                key: '5',
                label: (
                    <div className={s.itemLink}>
                        <NavLink to="/products/list">
                            Список продуктов
                        </NavLink>
                    </div>
                ),
            },
            {
                key: '6',
                label: (
                    <div className={s.itemLink}>
                        <NavLink to="/requisites">
                            Реквизиты
                        </NavLink>
                    </div>
                ),
            },
            {
                key: '7',
                label: (
                    <div className={s.itemLink}>
                        <NavLink to="/comments">
                            Отзывы
                        </NavLink>
                    </div>
                ),
            },
            {
                key: '8',
                label: (
                    <div className={s.itemLink}>
                        <NavLink to="/users/list">
                            Пользователи
                        </NavLink>
                    </div>
                ),
            },
            {
                key: '9',
                label: (
                    <div className={s.itemLink}>
                        <NavLink to="/categories/list">
                            Категории
                        </NavLink>
                    </div>
                ),
            },
        );
    }

    return (
        <>
            <Menu setModal={setModal} user={user} isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)}/>
            <Poplnenie isActive={popolnenie} close={() => setPopolnenie(false)}/>
            {modal ? <AuthModal close={() => setModal(null)} isLogin={modal === "login"}/> : null}
            <div className={s.header}>
                <img src="https://i.ibb.co/f9LVt37/logo.jpg" alt="logo"/>
                <div className={s.links}>
                    <div>
                        <NavLink to="/">ТОВАРЫ</NavLink>
                    </div>
                    <div>
                        <NavLink to="/reviews">ОТЗЫВЫ</NavLink>
                    </div>
                    <div>
                        <a>НОВОСТИ</a>
                    </div>
                    <div>
                        <a>ПОДДЕРЖКА</a>
                    </div>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className={s.burgerButton}>☰</button>
                <div className={s.login}>
                    {user ? <div className={s.profile}>
                        <div className={s.leftDiv}>
                            <h2>{user.login}</h2>
                            <p>0 RUB</p>
                        </div>
                        <div style={{marginLeft: "10px"}}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <div className={s.arrow}>
                                        <Arrow/>
                                    </div>
                                </a>
                            </Dropdown>
                        </div>
                    </div> : <>
                        <div onClick={() => setModal("login")}>
                            <Person/>
                            <p>Вход</p>
                        </div>
                        <div onClick={() => setModal("register")}>
                            <Key/>
                            <p>Регистрация</p>
                        </div>
                    </>}
                </div>
            </div>
        </>
    );
};
