import s from './Purchase.module.scss'
import {PurchaseItem} from "../../components/PurchaseItem/PurchaseItem";
export const Purchase = () => {
    return (
        <div className={s.purchase}>
            <h1 className={s.title}>Мои покупки</h1>
            <p className={s.description}>Всего заказов: 1 шт. (на сумму: 0 RUB)</p>
            <div className={s.items}>
                <PurchaseItem />
                <PurchaseItem />
                <PurchaseItem />
            </div>
        </div>
    )
}