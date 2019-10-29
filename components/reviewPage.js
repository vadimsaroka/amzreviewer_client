import Link from "next/link";

const ReviewPage = props => {
  const orderDate = new Date(props.review.orderDate).toLocaleDateString();
  return (
    <div className="review">
      <div className="review__info">
        <h3 className="review__header">{orderDate}</h3>
        <div className="review__left">
          <Link href={`/editReview?id=${props.review.id}`} as={props.review.id}>
            <img
              className="review__image"
              src={props.img}
              alt="image"
            />
          </Link>
        </div>
        <div className="review__right">
          <Link href={`/editReview?id=${props.review.id}`} as={props.review.id}>
            <a className="review__description">{props.review.name}</a>
          </Link>
          <p>Group name: {props.review.groupName}</p>
          {/* <p>${Math.round(props.review.result* 100) / 100}</p> */}
          <p className="review__price">${props.review.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
