import s from './Purchase.module.scss'
import {PurchaseItem} from "../../components/PurchaseItem/PurchaseItem";
import {useSelector} from "react-redux";

export const Purchase = () => {
    const state = useSelector(state => state.user.data)
    return (
        <div className={s.purchase}>
            <h1 className={s.title}>Мои покупки</h1>
            <p className={s.description}>Всего заказов: 1 шт. (на сумму: 0 RUB)</p>
            <div className={s.items}>
                {state ? (
                    state.orders.map(item => (
                        <PurchaseItem key={item.id} item={item} />
                    ))
                ) : (
                    <div>
                        Товары не найдены.
                    </div>
                )}
            </div>
        </div>
    )
}