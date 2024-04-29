import s from './Requisite.module.scss'
import React, {useEffect, useState} from "react";
import style from "../ProductsList/ProductsList.module.scss";
import {ChangeRequisites} from "../../components/Modals/ChangeRequisites/ChangeRequisites";
import axios from "../../core/axios";

const Requisite = () => {
    const [requisite, setRequisite] = useState()
    const [modal, setModal] = useState(false)

    const getProducts = async () => {
        try {
            const {data} = await axios.get("/getAllRequisites");
            setRequisite(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {requisite ? <ChangeRequisites update={getProducts} info={requisite[0]} isOpened={modal}
                                           setOpen={() => setModal(() => !modal)}/> : null}
            <div className={s.requisite}>
                <div className={s.addProduct}>
                    <button onClick={() => setModal(!modal)}>Изменить реквизиты</button>
                </div>
                <table className={s.table} style={{marginTop: "10px"}}>
                    <thead>
                    <tr>
                        <th>
                            Название реквизита <span className="icon-arrow">↑</span>
                        </th>
                        <th>
                            Текст реквизита <span className="icon-arrow">↑</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {requisite ? <>
                        <tr>
                            <td>RuCard</td>
                            <td>{requisite[0]?.ruCard}</td>
                        </tr>
                        <tr>
                            <td>BTC</td>
                            <td>{requisite[0]?.btcAddress}</td>
                        </tr>
                        <tr>
                            <td>LTC</td>
                            <td>{requisite[0]?.liteCoin}</td>
                        </tr>
                        <tr>
                            <td>USDT/TRC</td>
                            <td>{requisite[0]?.usdtTRC20Address}</td>
                        </tr>
                        <tr>
                            <td>XMR</td>
                            <td>{requisite[0]?.moneroXMR}</td>
                        </tr>
                    </> : null}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Requisite