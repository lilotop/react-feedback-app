import { Card } from './shared/Card';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import { FeedbackContext } from '../context/FeedbackContext';
import { Feedback } from '../data/feedbackData';

type Props = {
  item: Feedback;
};

function FeedbackItem({ item }: Props) {
  const context = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => context.deleteFeedback(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button onClick={() => context.editFeedback(item)} className="edit">
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

export { FeedbackItem };
