import { Key, useState } from "react";
import "./index.scss";
import Comments from "./../Comments";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggle } from "../../features/register";
import { popupModal } from "../../features/popupModal";
import { backendUrl } from "../../utils/helper";

type HostelReviewProps = {
  review: {
    id: string;
    hostelId: string;
    review: string;
    rating: number;
    userId: string;
    userName: string;
    userImage: string;
  }[];
  hostelId: string;
};

function HostelReview({ review, hostelId }: HostelReviewProps) {
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(review);
  const commentBy = useSelector((state) => state.user.value.id);
  const dispatch = useDispatch();

  const sendComment = async () => {
    if (!comment) {
      return dispatch(popupModal({ message: "Empty comment!", cName: "red" }));
    }
    if (!commentBy) {
      return dispatch(toggle({ toggleState: true, sign: "in" }));
    }
    setComment("");
    try {
      await axios
        .post(`${backendUrl}/getcomments`, {
          comment,
          hostelId,
          commentBy,
        })
        .then((res) => {
          setReviews(res.data.reviews);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="hostel-review">
      <h1>{review.length} Reviews</h1>
      <div className="submit-review">
        <div className="input-field">
          <textarea
            type="text"
            placeholder="Your Review"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn-color" type="submit" onClick={sendComment}>
          Submit
        </button>
      </div>
      <div className="all-reviews">
        {reviews.map((comment, index: Key) => {
          return <Comments {...comment} key={index} />;
        })}
      </div>
    </div>
  );
}

export default HostelReview;
