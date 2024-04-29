import React from 'react'
import s from './Reviews.module.scss'
import ReviewItem from '../../components/ReviewItem/ReviewItem'
const Reviews = () => {
  return (
    <div className={s.reviews}>
        <h1>Отзывы</h1>

        <div className={s.list}>
            <ReviewItem date={"15.04.2024"} name={"Витрина №1, НИЖНИЙ НОВГОРОД, 2г СК Super Speed 💎, Автозавод прикоп"} sum={'5500 RUB'} text={'Забрали, все дома,но есть одно но, пришлось пришлось искать пути обхода, местность рядом была вся в воде('}/>
            <ReviewItem date={"15.04.2024"} name={"Витрина №1, НИЖНИЙ НОВГОРОД, 2г СК Super Speed 💎, Автозавод прикоп"} sum={'5500 RUB'} text={'Забрали, все дома,но есть одно но, пришлось пришлось искать пути обхода, местность рядом была вся в воде('}/>
            <ReviewItem date={"15.04.2024"} name={"Витрина №1, НИЖНИЙ НОВГОРОД, 2г СК Super Speed 💎, Автозавод прикоп"} sum={'5500 RUB'} text={'Забрали, все дома,но есть одно но, пришлось пришлось искать пути обхода, местность рядом была вся в воде('}/>
        </div>
    </div>
  )
}

export default Reviews