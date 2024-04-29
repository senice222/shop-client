import React from 'react'
import style from './ChoseProductModal.module.scss'
import img from '../../../assets/5debfd6a9497cb3c151c5faead53ec1851c657cc.png'
import {useDispatch, useSelector} from "react-redux";
import {chooseType} from "../../../store/slices/paymentSlice";
import axios from "../../../core/axios";


const ChoseProductModal = ({orderModal, setOrderModal, buyProduct}) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.payment.paymentType)
    const getClassName = {
        "rub": state === "rub" ? style.active : "",
        "btc": state === "btc" ? style.active : "",
        "usdt": state === "usdt" ? style.active : "",
        "ltc": state === "ltc" ? style.active : "",
        "xmr": state === "xmr" ? style.active : "",
    };

    function generateOrderNumber() {
        const min = 100000;
        const max = 999999;
        return `Заказ #${Math.floor(Math.random() * (max - min + 1)) + min}`;
    }

    const createOrder = async () => {
        const orderHash = generateOrderNumber();
        try {
            const body = {
                orderName: orderHash,
                title: buyProduct?.title,
                quantity: 1,
                currency: state,
                price: buyProduct?.price,
            }
            const {data} = await axios.post("/order/create", body)
            window.location.replace(`http://localhost:3000/order/info/${data.id}`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={orderModal ? `${style.modal} ${style.active}` : style.modal}
             onClick={() => setOrderModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={style.leftContainer}>
                    <div className={style.imgDiv}>
                        <img src={`http://localhost:4000/uploads/${buyProduct?.image}`} alt="/"/>
                    </div>
                    <div className={style.priceDiv}>
                        <p>Итоговая цена : <b>{buyProduct?.price} RUB</b></p>
                    </div>
                </div>
                <div className={style.productInfo}>
                    <div className={style.info}>
                        <h2>{buyProduct?.title}</h2>
                        <h3>{buyProduct?.price} RUB</h3>
                        <p>{buyProduct?.gramm}г</p>
                    </div>
                    <div className={style.typeOfPayment}>
                        <p>Выберите метод оплаты</p>
                        <div onClick={() => dispatch(chooseType("rub"))} className={getClassName["rub"]}>Перевод на
                            карту (RUB)
                        </div>
                        <div onClick={() => dispatch(chooseType("btc"))} className={getClassName["btc"]}>Bitcoin (BTC)
                        </div>
                        <div onClick={() => dispatch(chooseType("usdt"))} className={getClassName["usdt"]}>Tether TRC20
                            (USDT)
                        </div>
                        <div onClick={() => dispatch(chooseType("ltc"))} className={getClassName["ltc"]}>Litecoin
                            (LTC)
                        </div>
                        <div onClick={() => dispatch(chooseType("xmr"))} className={getClassName["xmr"]}>Monero (XMR)
                        </div>
                    </div>
                    <div className={style.promo}>
                        <input placeholder="Промокод"/>
                        <button className={style.promoBtn}>Активировать</button>
                    </div>
                    <button type="submit" onClick={createOrder}>
                        Перейти к оплате
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChoseProductModal