import s from './PurchaseItem.module.scss'
import {Arrow} from "../Header/Svgs";
import {useState} from "react";
export const PurchaseItem = () => {
    const [opened, setOpened] = useState(false)

    return (
        <div className={s.item}>
            <div className={s.topDiv}>
                <div className={s.info}>
                    <div className={s.topInfo}>
                        <h2>Заказ №169241</h2>
                        <p>18.04.2024</p>
                    </div>
                    <p className={s.count}>Товаров: 1 шт на сумму 0.009098 XMR</p>
                </div>
                <div className={s.right}>
                    <div className={s.status + " " + s.cancelled}>
                        Отменен
                    </div>
                    <div onClick={() => setOpened((open) => !open)} className={`${s.btn} ${opened ? s.opened : ""}`}><Arrow /></div>
                </div>
            </div>
            <div className={`${s.bottomDiv} ${opened ? s.botOpen : ""}`}>
                <hr />
                <div className={s.topXui}>
                    <div>
                        <h2>Товар:</h2>
                        <p>Пополнение баланса, 100 RUB</p>
                    </div>
                    <div>
                        <h2>Кол-во:</h2>
                        <p>1 шт</p>
                    </div>
                </div>
                <div className={s.bott}>
                    <h2>Дата покупки:</h2>
                    <p>18.04.2024 14:13</p>
                </div>
            </div>
        </div>
    )
}