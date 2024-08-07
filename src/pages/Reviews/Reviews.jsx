import React, {useEffect, useState} from 'react'
import s from './Reviews.module.scss'
import ReviewItem from '../../components/ReviewItem/ReviewItem'
import instance from "../../core/axios";
import {CreateCommentModal} from "../../components/Modals/CreateCommentModal/CreateCommentModal";
import {useSelector} from "react-redux";

const Reviews = () => {
    const [reviews, setReviews] = useState()
    const [active, setActive] = useState()
    const user = useSelector((state) => state.user).data

    const getReviews = async () => {
        try {
            const {data} = await instance.get('/reviews')
            setReviews(data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getReviews()
    }, [])
    return (
        <>
            {user ? <CreateCommentModal update={getReviews} user={user} isAdmin={false} isOpened={active}
                                        setIsOpened={() => setActive(!active)}/> : null}
            <div className={s.reviews}>
                <h1>Отзывы</h1>

                {reviews ? <div className={s.list}>
                    {reviews.map((item) => <ReviewItem date={item.date} name={item.productId} text={item.text}
                                                       isAdmin={false}/>)}
                </div> : <h3>Loading...</h3>}
            </div>
        </>
    )
}

export default Reviews