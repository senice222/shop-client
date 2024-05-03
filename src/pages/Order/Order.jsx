import React, { useEffect, useState } from 'react';
import style from './Order.module.scss'
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../core/axios";
import CountdownTimer from '../../components/Counter/CounterDownTimer';

const Order = () => {
    const { id } = useParams()
    const [order, setOrder] = useState()
    const [requisites, setRequisites] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getOrder = async () => {
            const { data } = await axios.get(`/order/${id}`)
            setOrder(data)
        }
        getOrder()
    }, [id]);

    useEffect(() => {
        const getRequisites = async () => {
            const { data } = await axios.get(`/getAllRequisites`)
            setRequisites(data)
        }
        getRequisites()
    }, [])
    function generateTXID() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        return result;
    }
    
    
    const txid = generateTXID();
    console.log(order);
    const firstEl = requisites?.[0]
    const getPrice = firstEl?.[order?.currency]

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
                                    <td>{order?.orderName}</td>
                                </tr>
                                <tr>
                                    <td>TXID</td>
                                    <td>{txid}</td>
                                </tr>
                                <tr>
                                    <td className={style.orderStatic}>Наименование заказа</td>
                                    <td>{order?.city}, {order?.title}</td>
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
                                    <td>{order?.currency ? order?.price : order?.price.toFixed(5)}</td>
                                </tr>
                                <tr>
                                    <td>Время на оплату</td>
                                    <td>
                                        <CountdownTimer />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Статус</td>
                                    <td className={style.orderStatic}>
                                        <span className={style.waitPayment}>Ожидается оплата</span>
                                        <p>Ожидается {order?.currency ? order?.price : order?.price.toFixed(5)} "Тип оплаты: {order?.currency}" на реквизиты:</p>
                                        <p className={style.orderAddress}>
                                            {getPrice}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.orderStatic}></td>
                                    <td><p>Вы должны перевести !!! РОВНО !!! указанную сумму (не больше и не меньше), иначе
                                        ваш платеж зачислен не будет!!!!. При переводе не точной суммы вы оплатите чужой
                                        заказ и потеряете средства.</p>
                                        <br />
                                        <p> Делайте перевод одним платежом, если вы разобьете платеж на несколько, ваш
                                            платеж зачислен не будет!</p>
                                        <br />
                                        <p> Платежи с терминалов или по смс не принимаются, ваш платеж зачислен не
                                            будет!</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.orderBottom} onClick={() => navigate('/')}>
                        <button>
                            <span>Отменить заказ</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
