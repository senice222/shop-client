import s from './CreateCommentModal.module.scss'
import instance from "../../../core/axios";
import React, { useEffect, useState } from "react";
import { Select } from "antd";

export const CreateCommentModal = ({ isOpened, setIsOpened, user, update, isAdmin }) => {
    const [products, setProducts] = useState()
    const [choosedProduct, setChoosedProduct] = useState()
    const [price, setPrice] = useState()
    const [text, setText] = useState()
    const date = new Date()


    const getProducts = async () => {
        try {
            const { data } = await instance.get("/getAllProducts");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    const handleSave = async () => {
        try {
            if (choosedProduct && price && text) {
                const { data } = await instance.post('/createReview', {
                    date: `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`,
                    productId: choosedProduct,
                    text,
                })
                if (data._id) {
                    update()
                    setIsOpened()
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div onClick={setIsOpened} className={`${s.modalBg} ${isOpened ? s.active : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                <h1>Создание отзыва</h1>
                <div className={s.items}>

                    <h2>Выберите товар</h2>

                    {products ?   
                        <div className={s.categoryDiv}>
                            <select
                                defaultValue="Выберите товар"
                                style={{ width: '95%', zIndex: "999999" }}
                                className={s.inputZ}
                                onChange={(e) => setChoosedProduct(e.target.value)}
                            >
                                <option disabled>Выберите товар</option>
                                {products.map((item, index) => (
                                    <option key={index} className={s.option} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        : <p>Loading...</p>}

                    <h2>Стоимость</h2>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder={"1000"} />
                    <h2>Текст</h2>
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder={"Все отлично"} />
                    <button onClick={handleSave}>Сохранить</button>
                </div>

            </div>
        </div>
    )
}