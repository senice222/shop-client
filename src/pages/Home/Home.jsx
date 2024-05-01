import React, {useEffect, useState} from 'react'
import style from './Home.module.scss'
import {Arrow} from "../../components/Header/Svgs";
import axios from "../../core/axios";
import ChoseProductModal from "../../components/Modals/ChoseProductModal/ChoseProductModal";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [categories, setCategories] = useState()
    const [products, setProducts] = useState()
    const [choseCategory, setChoseCategory] = useState("Выберите категорию")
    const [filteredProduct, setFilteredProduct] = useState()
    const [orderModal, setOrderModal] = useState(false)
    const [buyProduct, setBuyProduct] = useState()

    useEffect(() => {
        const getCategories = async () => {
            const {data} = await axios.get("category/list")
            setCategories(data)
        }

        const getProducts = async () => {
            const city = localStorage.getItem('city')
            const {data} = await axios.get("getAllProducts")
            const normalizedProducts = data.filter((item) => item.city === city)
            console.log(normalizedProducts)
            setProducts(normalizedProducts)
            setFilteredProduct(normalizedProducts)
        }
        getCategories()
        getProducts()
    }, []);
    
    const filterProducts = (category) => {
        const normalizedCategory = category.toLowerCase().trim()
        const filteredProducts = products.filter(item => item.category.toLowerCase().trim() === normalizedCategory)
        setChoseCategory(category)
        setFilteredProduct(filteredProducts)
        setIsOpen(false)
        console.log(products)
    }
    
    const buyProductHandler = (product) => {
        setBuyProduct(product)
        setOrderModal(true)
    }
    return (
        <div className={style.home}>
            <div className={style.firstBlock}>
                <h1>FASHION</h1>
                <div className={style.banner}></div>
            </div>
            <div className={style.inputs}>
                <div className={style.section}>
                    <div className={style.sectionDiv}>
                        <p>{choseCategory}</p>
                        <div onClick={() => setIsOpen((isOpen) => !isOpen)}
                             className={`${style.btn} ${categories ? style.opened : ""}`}><Arrow/></div>
                    </div>
                    {
                        isOpen && (
                            <ul className={style.ul}>
                                {categories && categories.map(item => (
                                    <li className={style.li} onClick={() => filterProducts(item.category)}>
                                        {item.category}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
                <div style={{height: "56px"}}>
                    <button className={style.btnFilter}>
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
                                     className={style.productsItemImg}/>
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
            <ChoseProductModal orderModal={orderModal} setOrderModal={setOrderModal} buyProduct={buyProduct}/>
        </div>
    )
}

export default Home
