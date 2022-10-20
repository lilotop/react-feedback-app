import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { FeedbackContext } from '../context/FeedbackContext';

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  defaultValue: number;
  select: (newValue: number) => void;
};

function RatingSelect({ select, defaultValue }: Props) {
  const [selected, setSelected] = useState(defaultValue);
  const context = useContext(FeedbackContext);
  useEffect(() => {
    if (context.feedbackEditData.isEditing && context.feedbackEditData.item) {
      setSelected(context.feedbackEditData.item.rating);
    }
  }, [context.feedbackEditData]);

  function handleChange(e: { currentTarget: { value: string } }) {
    let newValue = +e.currentTarget.value;
    setSelected(newValue);
    select(newValue);
  }
  return (
    <ul className="rating">
      {options.map(option => {
        return (
          <li key={option}>
            <input
              type="radio"
              name="rating"
              id={`num${option}`}
              value={option}
              onChange={handleChange}
              checked={selected === option}
            />
            <label htmlFor={`num${option}`}>{option}</label>
          </li>
        );
      })}
    </ul>
  );
}

export { RatingSelect };
