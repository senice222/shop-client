import React from 'react'
import style from './ChoseProductModal.module.scss'
import img from '../../../assets/5debfd6a9497cb3c151c5faead53ec1851c657cc.png'
import {useDispatch, useSelector} from "react-redux";
import {chooseType} from "../../../store/slices/paymentSlice";
import axios from "../../../core/axios";


const ChoseProductModal = ({orderModal, setOrderModal, buyProduct}) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.payment.paymentType)
    const user = useSelector(state => state.user.data)
    const getClassName = {
        "ruCard": state === "ruCard" ? style.active : "",
        "btcAddress": state === "btcAddress" ? style.active : "",
        "usdtTRC20Address": state === "usdtTRC20Address" ? style.active : "",
        "liteCoin": state === "liteCoin" ? style.active : "",
        "moneroXMR": state === "moneroXMR" ? style.active : "",
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
                city: buyProduct?.city,
                price: +buyProduct?.price,
            }
            if (user) {
                const bodyForUser = {
                    _id: user?._id,
                    orderName: orderHash,
                    title: buyProduct?.title,
                    quantity: 1,
                    currency: state,
                    city: buyProduct?.city,
                    price: +buyProduct?.price,
                }
                await axios.post("/user/addOrder", bodyForUser)
            }
            
            const {data} = await axios.post("/order/create", body)
            window.location.replace(`http://localhost:3000/order/info/${data.id}`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={orderModal ? `${style.modal} ${style.active1}` : style.modal}
             onClick={() => setOrderModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={style.leftContainer}>
                    <div className={style.imgDiv}>
                        <img src={`http://happyshop23.co/internal/uploads/${buyProduct?.image}`} alt="/"/>
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
                        <div onClick={() => dispatch(chooseType("ruCard"))} className={getClassName["ruCard"]}>Перевод на
                            карту (RUB)
                        </div>
                        <div onClick={() => dispatch(chooseType("btcAddress"))} className={getClassName["btcAddress"]}>Bitcoin (BTC)
                        </div>
                        <div onClick={() => dispatch(chooseType("usdtTRC20Address"))} className={getClassName["usdtTRC20Address"]}>Tether TRC20
                            (USDT)
                        </div>
                        <div onClick={() => dispatch(chooseType("liteCoin"))} className={getClassName["liteCoin"]}>Litecoin
                            (LTC)
                        </div>
                        <div onClick={() => dispatch(chooseType("moneroXMR"))} className={getClassName["moneroXMR"]}>Monero (XMR)
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