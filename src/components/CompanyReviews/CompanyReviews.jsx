import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star, UserCircle } from 'lucide-react';

// Dữ liệu mẫu
const sampleReviews = [
  {
    id: '1',
    user: 'Nguyễn Văn A',
    avatar: '', // URL to avatar or use default
    rating: 5,
    comment: 'Môi trường làm việc tuyệt vời, đồng nghiệp thân thiện, nhiều cơ hội phát triển. Rất khuyến khích!',
    date: '20/07/2024',
  },
  {
    id: '2',
    user: 'Trần Thị B',
    avatar: '',
    rating: 4,
    comment: 'Công ty có chế độ đãi ngộ tốt, tuy nhiên áp lực công việc đôi khi hơi cao. Nhìn chung là một nơi tốt để làm việc.',
    date: '15/07/2024',
  },
];

const StarRating = ({ rating, setRating, readOnly = false }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          onClick={() => !readOnly && setRating(star)}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow">
      <div className="flex items-center mb-2">
        {review.avatar ? (
          <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full mr-3" />
        ) : (
          <UserCircle className="w-10 h-10 rounded-full mr-3 text-gray-400" />
        )}
        <div>
          <p className="font-semibold text-gray-800">{review.user}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
      <div className="mb-2">
        <StarRating rating={review.rating} readOnly={true} />
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
};

const CompanyReviews = ({ companyId }) => {
  const [reviews, setReviews] = useState(sampleReviews); // Sau này sẽ fetch theo companyId
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newRating === 0 || newReview.trim() === '') {
      alert('Vui lòng chọn số sao và viết đánh giá của bạn.');
      return;
    }
    setSubmitting(true);
    // TODO: Gửi đánh giá lên Firestore
    console.log({ companyId, rating: newRating, comment: newReview });
    // Giả lập việc gửi
    await new Promise(resolve => setTimeout(resolve, 1000));
    const submittedReview = {
      id: Date.now().toString(),
      user: 'Người dùng hiện tại', // Lấy từ auth context
      avatar: '',
      rating: newRating,
      comment: newReview,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    setReviews([submittedReview, ...reviews]);
    setNewReview('');
    setNewRating(0);
    setSubmitting(false);
  };

  return (
    <div className="mt-8 py-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 px-6 text-gray-800">Đánh giá từ cộng đồng</h2>
      
      <div className="px-6 mb-8">
        <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Chia sẻ trải nghiệm của bạn</h3>
          <div className="mb-3">
            <StarRating rating={newRating} setRating={setNewRating} />
          </div>
          <Textarea
            placeholder="Viết đánh giá của bạn ở đây..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="mb-3 min-h-[100px]"
            rows={4}
          />
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
        </form>
      </div>

      <div className="px-6">
        {reviews.length > 0 ? (
          reviews.map(review => <ReviewCard key={review.id} review={review} />)
        ) : (
          <p className="text-center text-gray-500">Chưa có đánh giá nào cho công ty này.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyReviews;