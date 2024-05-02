import React, { useEffect, useState } from 'react'
import style from './Home.module.scss'
import axios from "../../core/axios";
import ChoseProductModal from "../../components/Modals/ChoseProductModal/ChoseProductModal";
import { CityModalStart } from '../../components/Modals/CityModalStart/CityModalStart';
import { CategoryModalStart } from "../../components/Modals/CategoryModalStart/CategoryModalStart";

const Home = () => {
    const [categories, setCategories] = useState()
    const [products, setProducts] = useState()
    const [filteredProduct, setFilteredProduct] = useState()
    const [orderModal, setOrderModal] = useState(false)
    const [buyProduct, setBuyProduct] = useState()
    const [opened, setOpened] = useState(false)
    const [openedCategory, setOpenedCategory] = useState(false)

    useEffect(() => {
        const city = localStorage.getItem('city')
        const category = localStorage.getItem('category')

        const getCategories = async () => {
            const { data } = await axios.post("/category/list", { city })
            setCategories(data)
        }

        const getProducts = async () => {
            const { data } = await axios.get("/getAllProducts")
            if (city && category) {
                const normalizedProducts = data.filter((item) => {
                    return item.city === city && item.category === category;
                });
                setProducts(normalizedProducts)
                setFilteredProduct(normalizedProducts)
            } else {
                setProducts(data)
                setFilteredProduct(data)
            }
        }
        getCategories()
        getProducts()
    }, []);
    const buyProductHandler = (product) => {
        setBuyProduct(product)
        setOrderModal(true)
    }
    return (
        <>
            <CityModalStart opened={opened} setOpened={setOpened} />
            <CategoryModalStart opened={openedCategory} setOpened={setOpenedCategory} />
            <div className={style.home}>
                <div className={style.firstBlock}>
                    <h1>FASHION</h1>
                    <div className={style.banner}></div>
                </div>
                <div className={style.inputs}>
                    <div className={style.section}>
                        <button className={`${style.btnFilter} ${style.changeCity}`}
                            onClick={() => setOpened(true)}>Выберите город
                        </button>
                    </div>
                    <div className={style.section}>
                        <button className={`${style.btnFilter} ${style.changeCity}`}
                            onClick={() => setOpenedCategory(true)}>Выберите категорию
                        </button>
                    </div>
                    <div className={style.section} style={{ height: "56px" }}>
                        <button className={`${style.btnFilter} ${style.hid}`}>
                            Показать
                        </button>
                    </div>
                </div>
                <div className={style.items}>
                    <div className={style.containerInner}>
                        {
                            filteredProduct?.length > 0 ? filteredProduct?.map(item => (
                                <div className={style.productsContentItem} key={item._id}>
                                    <div className={style.productsItemName}>
                                        {item.title}
                                    </div>
                                    <img src={`http://happyshop23.co/internal/uploads/${item.image}`} alt='/'
                                        className={style.productsItemImg} />
                                    <div className={style.productsItemInfo}>
                                        <p>Категория: {item.category}</p>
                                        <p>Город: {item.city}</p>
                                        <p>{item.price}</p>
                                        <button onClick={() => buyProductHandler(item)}>Купить</button>
                                    </div>
                                </div>
                            )) : (
                                <div className={style.productsContentItem}>
                                    Товаров нет.
                                </div>
                            )
                        }
                    </div>
                </div>
                <ChoseProductModal orderModal={orderModal} setOrderModal={setOrderModal} buyProduct={buyProduct} />
            </div>
        </>
    )
}

export default Home
