import React, {useEffect, useState} from 'react';
import style from './CategoriesList.module.scss'
import {useDebounce} from "../../hooks/useDebouce";
import instance from "../../core/axios";
import CategoryModal from "../../components/Modals/CategoryModal/CategoryModal";
import { CategoryEditModal } from '../../components/Modals/CategoryModal/CategoryEditModal';

const CategoriesList = () => {
    const [categories, setCategories] = useState()
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value, 400)
    const [createModal, setCreateModal] = useState(false)
    const [opened, setOpened] = useState(false)
    const [activeCategory, setActiveCategory] = useState()
    const getProducts = async () => {
        try {
            const {data} = await instance.get("/category/list");
            setCategories(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        
        getProducts();
    }, []);
    const categoriesSearch = categories?.filter(item => item.category.toLowerCase().includes(debouncedValue.toLowerCase()))
    const handleEdit = (item) => {
        setActiveCategory(item)
        setOpened(!opened)
    }
    //
    return (
        <div className={style.productsList}>
            {activeCategory ? <CategoryEditModal update={getProducts} item={activeCategory} opened={opened} setOpened={() => setOpened(!opened)}/> : null }
            <CategoryModal update={getProducts} createModal={createModal} setCreateModal={setCreateModal}/> 

            <div className={style.addProduct}>
                <button onClick={() => setCreateModal(true)}>Добавить категорию</button>
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
                                Айди <span className="icon-arrow">↑</span>
                            </th>

                            <th>
                                Название категории <span className="icon-arrow">↑</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories ? (
                            categoriesSearch.map((item, i) => (
                                <tr onClick={() => handleEdit(item)} key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.category}</td>
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

export default CategoriesList;
