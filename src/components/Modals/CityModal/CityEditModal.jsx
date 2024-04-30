import { useEffect, useState } from 'react'
import s from './CityModal.module.scss'
import instance from '../../../core/axios'

export const CityEditModal = ({opened, setOpened, item, update}) => {
    const [name, setName] = useState(item?.city)

    useEffect(() => {
        setName(item?.city)
    }, [item])

    const hadnleSave = async () => {
        try {
            const {status} = await instance.put(`/city/edit/${item._id}`, {city: name})
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
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <button onClick={hadnleSave}>Сохранить</button>
            </div>
        </div>
    )
}