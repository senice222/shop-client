import { useEffect, useState } from 'react'
import s from './EditCommentModal.module.scss'
import instance from '../../../core/axios'

export const EditCommentModal = ({setOpen, isOpenen, active, update}) => {
    const [date, setDate] = useState(active.date)
    const [productId, setProductId] = useState(active.productId)
    const [text, setText] = useState(active.text)

    useEffect(() => {
        setDate(active.date)
        setProductId(active.productId)
        setText(active.text)
    }, [active])

    const handleSave = async () => {
        try {
            const {data} = await instance.post(`/editReview/${active._id}`, {date, productId, text})
            if (data.date) {
                update()
                setOpen()
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div onClick={setOpen} className={`${s.modal} ${isOpenen ? s.opened : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                <div className={s.items}>
                    <div className={s.item}>
                        <h2>Дата:</h2>
                        <input value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className={s.item}>
                        <h2>Название товара:</h2>
                        <input value={productId} onChange={(e) => setProductId(e.target.value)}/>
                    </div>

                    <div className={s.item}>
                        <h2>Текст:</h2>
                        <input value={text} onChange={(e) => setText(e.target.value)}/>
                    </div>
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    )
}