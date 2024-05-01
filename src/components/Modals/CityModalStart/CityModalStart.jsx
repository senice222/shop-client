import { useEffect, useState } from 'react'
import s from './CityModalStart.module.scss'
import { Select } from 'antd'

import instance from '../../../core/axios'

export const CityModalStart = () => {
        const [opened, setOpened] = useState(false)
        const [city, setCity] = useState()
        const [setedCity, setSetedCity] = useState()
        const getCity = async () => {
            try {
                const { data } = await instance.get('/city/list')
                setCity(data)
            } catch (e) {
                console.log(e)
            }
        }
        useEffect(() => {
            const city1 = localStorage.getItem('city')

            if (!city1) {
                setOpened(true)
            }

            getCity()
        }, [ ])
        console.log(setedCity)

        const handleSave = () => {
            if (setedCity) {
                localStorage.setItem('city', setedCity)
                window.location.reload()
            }
        }
    return (
        <div className={`${s.bg} ${opened ? s.active : ""}`}>
            <div className={s.modal}>
                <h3>Выберите ваш город:</h3>

                {city ? <Select
                            defaultValue="Выберите город"
                            style={{ width: '95%', zIndex: "999999" }}
                            onChange={setSetedCity}
                            options={
                                city.map((item) => {
                                    return {
                                        value: item.city, label: item.city
                                    }
                                })
                            }
                        /> : <p>Loading...</p>}
                <button onClick={handleSave}>Сохранить</button>

            </div>
        </div>
    )
}