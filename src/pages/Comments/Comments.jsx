import s from './Comments.module.scss'
import ReviewItem from '../../components/ReviewItem/ReviewItem'
import { useEffect, useState } from 'react'
import instance from '../../core/axios'
import { EditCommentModal } from '../../components/Modals/EditCommentModal/EditCommentModal'

export const Comments = () => {
    const [reviews, setReviews] = useState()
    const [modal, setModal] = useState(false)
    const [active, setActive] = useState()

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
        {active ? <EditCommentModal update={getReviews} isOpenen={modal} setOpen={() => setModal(!modal)} active={active}/> : null}
        <div className={s.comments}>
            <div className={s.list}>
                <ReviewItem date={"15.04.2024"} name={"Витрина №1, НИЖНИЙ НОВГОРОД, 2г СК Super Speed 💎, Автозавод прикоп"} sum={'5500 RUB'} text={'Забрали, все дома,но есть одно но, пришлось пришлось искать пути обхода, местность рядом была вся в воде('} isAdmin={true}/>
                {reviews ? reviews.map((item) => <ReviewItem onClickFunc={() => setActiveItem(item)} key={item._id} date={item.date} name={item.productId} sum={item.sum} isAdmin={true} text={item.text} />) : null}
            </div>
        </div>
        </>
    )
}