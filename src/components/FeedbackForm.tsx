import { useState, useEffect, useContext } from 'react';
import { RatingSelect } from './RatingSelect';
import { Button } from './shared/Button';
import { Card } from './shared/Card';
import {
  FeedbackContext,
} from '../context/FeedbackContext';

function FeedbackForm() {
  const context = useContext(FeedbackContext);

  const [text, setText] = useState('');
  const [rating, setRating] = useState(8);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState<string | null>('');
  useEffect(() => {
    console.log('ff effect');
    if (context.feedbackEditData.isEditing && context.feedbackEditData.item) {
      setButtonDisabled(false);
      setText(context.feedbackEditData.item.text);
      setRating(context.feedbackEditData.item.rating);
    }
  }, [context.feedbackEditData]);
  function handleTextChange(e: { target: { value: any } }) {
    let newText = e.target.value;
    if (newText === '') {
      setButtonDisabled(true);
      setMessage(null);
    } else {
      if (newText.trim().length < 10) {
        setButtonDisabled(true);
        setMessage('Review needs at least 10 characters');
      } else {
        setButtonDisabled(false);
        setMessage(null);
      }
    }
    setText(newText);
  }
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = { text, rating };
      if (context.feedbackEditData.isEditing && context.feedbackEditData.item) {
        let id = context.feedbackEditData.item.id;
        context.updateFeedback(id, newFeedback);
      } else {
        context.addFeedback(newFeedback);
      }
      setText('');
      setRating(10);
      setButtonDisabled(true);
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our service?</h2>
        <RatingSelect
          select={rating => setRating(rating)}
          defaultValue={rating}
        />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="write a review..."
            value={text}
          />
          <Button type="submit" isDisabled={buttonDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export { FeedbackForm };
