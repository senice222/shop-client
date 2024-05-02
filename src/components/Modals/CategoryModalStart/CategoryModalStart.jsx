import { useEffect, useState } from 'react'
import s from './CategoryModalStart.module.scss'
import { Select } from 'antd'
import instance from '../../../core/axios'

export const CategoryModalStart = ({ opened, setOpened }) => {
    const [category, setCategory] = useState()
    const [setedCategory, setSetedCategory] = useState()
    const city = localStorage.getItem('city')

    const getCategories = async () => {
        const {data} = await instance.post("/category/list", {city})
        setCategory(data)
    }
    
    useEffect(() => {
        getCategories()
    }, [])

    const handleSave = () => {
        if (setSetedCategory) {
            localStorage.setItem('category', setedCategory)
            window.location.reload()
        }
    }
    return (
        <div className={`${s.bg} ${opened ? s.active : ""}`} onClick={() => setOpened(false)}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Выберите категорию:</h3>

                {category ? <Select
                    defaultValue={localStorage.getItem('city') ? localStorage.getItem('category') : "Выберите категорию"}
                    style={{ width: '95%', zIndex: "999999" }}
                    onChange={setSetedCategory}
                    options={
                        category.map((item) => {
                            return {
                                value: item.category, label: item.category
                            }
                        })
                    }
                /> : <p>Loading...</p>}
                <button onClick={handleSave}>Сохранить</button>

            </div>
        </div>
    )
}