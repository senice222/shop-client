import s from './Comments.module.scss'
import ReviewItem from '../../components/ReviewItem/ReviewItem'
import { useEffect, useState } from 'react'
import instance from '../../core/axios'
import { EditCommentModal } from '../../components/Modals/EditCommentModal/EditCommentModal'
import {CreateCommentModal} from "../../components/Modals/CreateCommentModal/CreateCommentModal";

export const Comments = () => {
    const [reviews, setReviews] = useState()
    const [modal, setModal] = useState(false)
    const [active, setActive] = useState()
    const [creating, setCreating] = useState(false)

    const getReviews = async () => {
        try {
            const {data} = await instance.get('/reviews')
            setReviews(data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }

    }
    const setActiveItem = (item) => {
        setActive(item)
        setModal(!modal)
    }
    useEffect(() => {
        getReviews()
    }, [ ])
    return (
        <>
            <CreateCommentModal update={getReviews} isOpened={creating} setIsOpened={() => setCreating(!creating)}/>
        {active ? <EditCommentModal update={getReviews} isOpenen={modal} setOpen={() => setModal(!modal)} active={active}/> : null}
        <div className={s.comments}>
            <div className={s.list}>
                {reviews ? reviews.map((item) => <ReviewItem onClickFunc={() => setActiveItem(item)} key={item._id} date={item.date} name={item.productId} sum={item.sum} isAdmin={true} text={item.text} />) : null}
            </div>
            <button onClick={() => setCreating(!creating)}>Добавить комментарий</button>
        </div>
        </>
    )
}