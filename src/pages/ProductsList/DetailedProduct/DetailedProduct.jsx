import React, {useEffect, useState} from 'react';
import style from './DetailedProduct.module.scss'
import {useParams} from "react-router-dom";
import axios from "../../../core/axios";
import EditProductModal from "../../../components/Modals/EditProductModal/EditProductModal";
import {notification} from "antd";

const DetailedProduct = () => {
    const [product, setProduct] = useState()
    const [editModal, setEditModal] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        const getProduct = async () => {
            const {data} = await axios.get(`/productById/${id}`)
            setProduct(data)
        }
        getProduct()
    }, []);

    const deleteProduct = async () => {
        try {
            await axios.delete(`/productDelete/${product?._id}`)
            notification.success({
                message: 'Успех.',
                duration: 1.5
            });
            window.location.replace('http://happyshop23.co/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <EditProductModal product={product} modal={editModal} setModal={setEditModal}/>
            <div className={style.wrapp}>
                <div className={style.productContainer}>
                    <h3>Информация об этом продукте</h3>
                    <div className={style.productInfo}>
                        <img src={`http://happyshop23.co/internal/uploads/${product?.image}`} alt="/"/>
                        <p className={style.title}>Название: {product?.title}</p>
                        <p className={style.category}>Категория: {product?.category}</p>
                        <p className={style.category}>Город: {product?.city}</p>
                        <p className={style.gramm}>Грамм: {product?.gramm}</p>
                        <p className={style.price}>Цена: {product?.price}</p>
                    </div>
                    <div className={style.btnsDiv}>
                        <button onClick={() => setEditModal(true)}>Редактировать</button>
                        <button className={style.delete} onClick={deleteProduct}>Удалить</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedProduct;
