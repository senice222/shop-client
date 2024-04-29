import s from './ChangeRequisites.module.scss'
import React, {useState} from "react";
import axios from "../../../core/axios";

export const ChangeRequisites = ({setOpen, isOpened, info, update}) => {
    const [ruCard, setRuCard] = useState(info.ruCard)
    const [btc, setBtc] = useState(info.btcAddress)
    const [ltc, setLtc] = useState(info.liteCoin)
    const [xmr, setXmr] = useState(info.moneroXMR)
    const [usd, setUsd] = useState(info.usdtTRC20Address)

    const handleSave = async () => {
        const response = await axios.post("/editRequisites", {
            ruCard,
            btcAddress: btc,
            liteCoin: ltc,
            moneroXMR: xmr,
            usdtTRC20Address: usd
        })
        if (response.data.ruCard) {
            update()
            setOpen()
        }
    }
    return (
        <div onClick={setOpen} className={`${s.modal} ${isOpened ? s.opened : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                <h2>Изменение реквизитов</h2>

                <div className={s.items}>
                    <div className={s.item}>
                        <div><h3>RU Карта</h3></div>
                        <input value={ruCard} onChange={(e) => setRuCard(e.target.value)}/>
                    </div>
                    <div className={s.item}>
                        <div><h3>BTC</h3></div>
                        <input value={btc} onChange={(e) => setBtc(e.target.value)}/>
                    </div>
                    <div className={s.item}>
                        <div><h3>LTC</h3></div>
                        <input value={ltc} onChange={(e) => setLtc(e.target.value)}/>
                    </div>
                    <div className={s.item}>
                        <div><h3>XMR</h3></div>
                        <input value={xmr} onChange={(e) => setXmr(e.target.value)}/>
                    </div>
                    <div className={s.item}>
                        <div><h3>USDT/TRC20</h3></div>
                        <input value={usd} onChange={(e) => setUsd(e.target.value)}/>
                    </div>
                </div>
                <div className={s.addProduct}>
                    <button onClick={handleSave}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}