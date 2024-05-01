import React, { useEffect, useState } from 'react'
import s from './CategoryModal.module.scss'
import instance from '../../../core/axios'
import {Select} from "antd";
import axios from "../../../core/axios";

export const CategoryEditModal = ({ opened, setOpened, item, update }) => {
    const [name, setName] = useState(item?.category)
    const [city, setCity] = useState(item?.city)
    const [cityCheckbox, setCityCheckbox] = useState()
    const [cities, setCities] = useState()

    useEffect(() => {
        setName(item?.category)
        setCity(item?.city)
    }, [item])

    useEffect(() => {
        const getCity = async () => {
            try {
                const { data } = await axios.get('/city/list')
                setCities(data)
            } catch (e) {
                console.log(e)
            }
        }
        getCity()
    }, [])

    const handleSave = async () => {
        try {
            const { status } = await instance.put(`/category/edit/${item._id}`, { category: name, city })
            if (status === 200) {
                update()
                setOpened()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async () => {
        try {
            const { status } = await instance.delete(`/category/delete/${item._id}`)
            if (status === 200) {
                update()
                setOpened()
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div onClick={setOpened} className={`${s.modalBg} ${opened ? s.active : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.modalCont}>
                <h2>Введите новое название:</h2>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                {cities ? <Select
                    defaultValue={city}
                    style={{ width: '95%', marginTop: "20px" }}
                    onChange={setCityCheckbox}
                    options={
                        cities.map((item) => {
                            return {
                                value: item.city, label: item.city
                            }
                        })
                    }
                /> : <p>Loading...</p>}
                <div className={s.botBtns}>
                    <button className={s.mainBtn} onClick={handleSave}>Сохранить</button>
                    <button onClick={handleDelete} className={s.delete}>x</button>
                </div>
            </div>
        </div>
    )
}