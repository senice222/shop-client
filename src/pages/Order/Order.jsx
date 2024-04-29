import React, {useEffect, useState} from 'react';
import style from './Order.module.scss'
import {useParams} from "react-router-dom";
import axios from "../../core/axios";

const Order = () => {
    const {id} = useParams()
    const [order, setOrder] = useState()

    useEffect(() => {
        const getOrder = async () => {
            const {data} = await axios.get(`/order/${id}`)
            setOrder(data)
        }
        getOrder()
    }, [id]);

    return (
        <div className={style.container}>
            <p className={style.title}>FASHION</p>
            <div className={style.orderWrap}>
                <div className={style.orderBlock}>
                    <div className={style.orderTitle}>{order?.orderName}</div>
                    <div className={style.orderContent}>
                        <table className={style.orderTable}>
                            <tbody>
                            <tr>
                                <td className={style.orderStatic}>Номер заказа</td>
                                <td>169240</td>
                            </tr>
                            <tr>
                                <td>TXID</td>
                                <td>73CE963B</td>
                            </tr>
                            <tr>
                                <td className={style.orderStatic}>Наименование заказа</td>
                                <td>НИЖНИЙ НОВГОРОД, {order?.title}</td>
                            </tr>
                            <tr>
                                <td className={style.orderStatic}>Количество</td>
                                <td>{order?.quantity} шт</td>
                            </tr>
                            <tr>
                                <td className={style.orderStatic}>Дата заказа</td>
                                <td>{order?.date}</td>
                            </tr>
                            <tr>
                                <td className={style.orderStatic}>Цена</td>
                                <td>{order?.price.toFixed(5)} {order?.currency}</td>
                            </tr>
                            <tr>
                                <td>Время на оплату</td>
                                <td>
                                    <span>00:13:09</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Статус</td>
                                <td className={style.orderStatic}>
                                    <span className={style.waitPayment}>Ожидается оплата</span>
                                    <p>Ожидается {order?.price} {order?.currency} на реквизиты:</p>
                                    <p className={style.orderAddress}>
                                        ltc1qe5pwztw3k4g9ekmny7ph0xmf73vszzp92jnud0
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={style.orderStatic}></td>
                                <td><p>Вы должны перевести !!! РОВНО !!! указанную сумму (не больше и не меньше), иначе
                                    ваш платеж зачислен не будет!!!!. При переводе не точной суммы вы оплатите чужой
                                    заказ и потеряете средства.</p>
                                    <br/>
                                    <p> Делайте перевод одним платежом, если вы разобьете платеж на несколько, ваш
                                        платеж зачислен не будет!</p>
                                    <br/>
                                    <p> Платежи с терминалов или по смс не принимаются, ваш платеж зачислен не
                                        будет!</p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.orderBottom}>
                        <button>
                            <span>На главную</span>
                        </button>
                        <button>
                            <span>Написать продавцу</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
