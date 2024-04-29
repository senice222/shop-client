import s from './Popolnenie.module.scss'
import {useState} from "react";
export const Poplnenie = ({isActive, close}) => {
    const [variant, setVariant] = useState('')
    return (
        <div onClick={close} className={`${s.modalBg} ${isActive ? s.active : ''}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                <h1>Пополнения</h1>
                <div className={s.inputDiv}>
                    <input placeholder={"Сумма"}/>
                    <div>RUB</div>
                </div>
                <div className={s.variants}>
                    <div className={variant==="RUB" ? s.active : ""} onClick={() => setVariant("RUB")}>ПЕРЕВОД НА КАРТУ (RUB)</div>
                    <div className={variant==="SBP" ? s.active : ""} onClick={() => setVariant("SBP")}>ПЕРЕВОД ПО СБП (RUB)</div>
                    <div className={variant==="BTC" ? s.active : ""} onClick={() => setVariant("BTC")}>BITCOIN (BTC)</div>
                    <div className={variant==="USDT" ? s.active : ""} onClick={() => setVariant("USDT")}>TETHER TRC20 (USDT)</div>
                    <div className={variant==="LTC" ? s.active : ""} onClick={() => setVariant("LTC")}>LITECOIN (LTC)</div>
                    <div className={variant==="XMR" ? s.active : ""} onClick={() => setVariant("XMR")}>MONERO (XMR)</div>
                </div>
                <button>Подтвердить</button>
            </div>
        </div>
    )
}