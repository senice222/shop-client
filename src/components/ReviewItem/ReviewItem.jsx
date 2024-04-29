import React from "react";
import s from "./ReviewItem.module.scss";

const ReviewItem = ({ date, name, sum, text, isAdmin, onClickFunc }) => {
  return (
    <div className={s.item}>
      <div className={s.content}>
        <p className={s.date}>{date}</p>
        <p className={s.vasya}>
          <b>Товар: </b>
          {name}
        </p>
        <p className={s.vasya}>
          <b>Сумма: </b>
          {sum}
        </p>
        <p className={s.text}>{text}</p>
      </div>
      {isAdmin ? <div onClick={onClickFunc} className={s.edit}>
        <svg
          fill="#000000"
          height="20px"
          width="20px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 306.637 306.637"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z" />{" "}
                <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z" />{" "}
              </g>{" "}
              <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
              <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </div> : null}
    </div>
  );
};

export default ReviewItem;
