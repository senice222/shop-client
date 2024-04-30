import React, {useEffect, useState} from 'react';
import style from './ProductsList.module.scss'
import {useDebounce} from "../../hooks/useDebouce";
import instance from '../../core/axios';
import AddModal from "../../components/Modals/AddModal/AddModal";

const ProductsList = () => {
    const [products, setProducts] = useState()
    const [value, setValue] = useState("")
    const [addModal, setAddModal] = useState(false)
    const debouncedValue = useDebounce(value, 400)
    const getProducts = async () => {
        try {
            const {data} = await instance.get("/getAllProducts");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);
    const productsSearch = products?.filter(item => item.title.toLowerCase().includes(debouncedValue.toLowerCase()))

    return (
        <div className={style.productsList}>
            <AddModal update={getProducts} createModal={addModal} setCreateModal={setAddModal}/>
            <div className={style.addProduct}>
                <button onClick={() => setAddModal(true)}>Добавить продукт</button>
            </div>
            <div className={style.searchDiv}>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
                <div>Поиск работает автоматически.</div>
            </div>
            <main className={style.table}>
                <section className={style.tableHeader}>
                    <h1>Список продуктов</h1>
                </section>
                <section className={style.tableBody}>
                    <table style={{marginTop: "10px"}}>
                        <thead>
                        <tr>
                            <th>
                                Название товара <span className="icon-arrow">↑</span>
                            </th>
                            <th>
                                Граммовка <span className="icon-arrow">↑</span>
                            </th>
                            <th>
                                Категория <span className="icon-arrow">↑</span>
                            </th>
                            <th>
                                Цена <span className="icon-arrow">↑</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products ? (
                            productsSearch.map((item, i) => (
                                <tr key={i} onClick={() => window.location.replace(`http://happyshop23.co/products/list/${item._id}`)}>
                                    <td>{item.title}</td>
                                    <td>{item.gramm}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <strong>{item.price}</strong>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Loading...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default ProductsList;
