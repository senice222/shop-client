import s from "./Header.module.scss";
import { Person, Key, Arrow } from "./Svgs";
import {NavLink, useNavigate} from 'react-router-dom'
import { AuthModal } from "../Modals/LoginAndRegisterModal/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "antd";
import { Poplnenie } from "../Modals/Popolnit/Poplnenie";
import Menu from "../BurgerMenu/BurgerMenu";
import { logout } from "../../store/slices/userSlice";


export const Header = () => {
    const [modal, setModal] = useState(null)
    const [popolnenie, setPopolnenie] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user).data
    const navigate = useNavigate()

    const items = [
        {
            key: '3',
            label: (
                <div className={s.itemLink} onClick={() => navigate("/purchases")}>
                    <a>
                        Мои покупки
                    </a>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className={s.itemLink} onClick={() => dispatch(logout())}>
                    <a>
                        Выйти
                    </a>
                </div>
            ),
        },
    ];

    if (user && user.status === "admin") {
        items.push(
            {
                key: '5',
                label: (
                    <div className={s.itemLink} onClick={() => navigate("/products/list")}>
                        <a>
                            Список продуктов
                        </a>
                    </div>
                ),
            },
            {
                key: '6',
                label: (
                    <div className={s.itemLink} onClick={() => navigate("/requisites")}>
                        <a>
                            Реквизиты
                        </a>
                    </div>
                ),
            },
            {
                key: '7',
                label: (
                    <div className={s.itemLink} onClick={() => navigate("/comments")}>
                        <a>
                            Отзывы
                        </a>
                    </div>
                ),
            },
            {
                key: '8',
                label: (
                    <div className={s.itemLink} onClick={() => navigate("/categories/list")}>
                        <a>
                            Категории
                        </a>
                    </div>
                ),
            },
            {
                key: '9',
                label: (
                    <div className={s.itemLink} onClick={() => navigate("/cities/list")}>
                        <a>
                            Города
                        </a>
                    </div>
                ),
            },
        );
    }

    return (
        <>
            <Menu setModal={setModal} user={user} isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
            <Poplnenie isActive={popolnenie} close={() => setPopolnenie(false)} />
            {modal ? <AuthModal close={() => setModal(null)} isLogin={modal === "login"} /> : null}
            <div className={s.header}>
                <img src="https://i.ibb.co/f9LVt37/logo.jpg" alt="logo" />
                <div className={s.links}>
                    <div>
                        <NavLink to="/">ТОВАРЫ</NavLink>
                    </div>
                    <div>
                        <NavLink to="/reviews">ОТЗЫВЫ</NavLink>
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
                        <div style={{ marginLeft: "10px" }}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <div className={s.arrow}>
                                        <Arrow />
                                    </div>
                                </a>
                            </Dropdown>
                        </div>
                    </div> : <>
                        <div onClick={() => setModal("login")}>
                            <Person />
                            <p>Вход</p>
                        </div>
                        <div onClick={() => setModal("register")}>
                            <Key />
                            <p>Регистрация</p>
                        </div>
                    </>}
                </div>
            </div>
        </>
    );
};
