import s from './Modal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchRegister} from "../../../store/slices/userSlice";
import {useEffect, useState} from "react";

export const AuthModal = ({isLogin, close}) => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    const [error, setError] = useState("")
    const user = useSelector(state => state.user)

    useEffect(() => {
        setError(user.error)
    }, [user.error])

    useEffect(() => {
        if (user.data?.login) {
            close()
        }
    }, [user])

    const handleBtn = () => {
        if (login.trim() !== "" && password.trim() !== "") {
            if (isLogin) {
                dispatch(fetchAuth({login, password}))
            } else if (password === secondPassword) {
                dispatch(fetchRegister({login, password}))
            } else {
                setError("Пароли не совпадают")
            }
        } else {
            setError("Заполните все поля")
        }

    }
    return (
        <div onClick={close} className={s.modalBg}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
                <div className={s.inputs}>
                    <input value={login} type="text" onChange={(e) => setLogin(e.target.value)} placeholder={"Логин"}/>
                    <input value={password} type="password"  onChange={(e) => setPassword(e.target.value)} placeholder={"Пароль"}/>
                    {!isLogin ? <input value={secondPassword} type="password" onChange={(e) => setSecondPassword(e.target.value)}
                                       placeholder={"Повторите пароль"}/> : null}
                </div>
                <button onClick={handleBtn}>Войти</button>
                <p>{error}</p>
            </div>
        </div>
    )
}