import s from './PurchaseItem.module.scss'
import {Arrow} from "../Header/Svgs";
import {useState} from "react";

export const PurchaseItem = ({item}) => {
    const [opened, setOpened] = useState(false)

    const prices = {
        "ruCard": "RUB",
        "btcAddress": "BTC",
        "usdtTRC20Address": "USDT",
        "liteCoin": "LTC",
        "moneroXMR": "XMR"
    }
    const currency = prices[item?.currency]

    return (
        <div className={s.item}>
            <div className={s.topDiv}>
                <div className={s.info}>
                    <div className={s.topInfo}>
                        <h2>{item?.orderName}</h2>
                        <p>{item?.date}</p>
                    </div>
                    <p className={s.count}>Товаров: 1 шт на сумму {item?.price} {currency}</p>
                </div>
                <div className={s.right}>
                    <div className={s.status + " " + s.cancelled}>
                        Средства не получены
                    </div>
                    <div onClick={() => setOpened((open) => !open)} className={`${s.btn} ${opened ? s.opened : ""}`}><Arrow /></div>
                </div>
            </div>
            <div className={`${s.bottomDiv} ${opened ? s.botOpen : ""}`}>
                <hr />
                <div className={s.topXui}>
                    <div>
                        <h2>Товар:</h2>
                        <p>Покупка товара, {item?.price} {currency}</p>
                    </div>
                    <div>
                        <h2>Кол-во:</h2>
                        <p>1 шт</p>
                    </div>
                </div>
                <div className={s.bott}>
                    <h2>Дата покупки:</h2>
                    <p>{item?.date}</p>
                </div>
            </div>
        </div>
    )
}