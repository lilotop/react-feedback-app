import React, { createContext, useState } from 'react';
import { Feedback, feedbackData } from '../data/feedbackData';
import { v4 as uuid } from 'uuid';

type FeedbackContextType = {
  feedback: Array<Feedback>;
  deleteFeedback: any;
  addFeedback: any;
  editFeedback: any;
  feedbackEditData: any;
  updateFeedback: any;
};

type Props = {
  children: React.ReactNode;
};
const FeedbackContext = createContext<FeedbackContextType>(
  {} as FeedbackContextType
);
const FeedbackProvider = ({ children }: Props) => {
  const [feedback, setFeedback] = useState(feedbackData);
  const EMPTY_FEEDBACK_EDIT_DATA = {
    item: {},
    isEditing: false,
  };
  const [feedbackEditData, setFeedbackEditData] = useState(
    EMPTY_FEEDBACK_EDIT_DATA
  );

  function deleteFeedback(id: string) {
    console.log('deleting feedback ' + id);
    setFeedback(feedback => feedback.filter(item => item.id !== id));
  }

  function addFeedback(feedbackItem: Feedback) {
    feedbackItem.id = uuid();
    setFeedback(feedback => [feedbackItem, ...feedback]);
  }

  function editFeedback(item: Feedback) {
    setFeedbackEditData({ item, isEditing: true });
  }

  function updateFeedback(id: string, updatedItem: Feedback) {
    setFeedback(feedback => {
      // one option of doing it
      // let listWithoutItem = feedback.filter((item) => item.id !== id);
      // return [...listWithoutItem, { ...updatedItem, id }];

      // a better option - also keeps items order
      // use map, when we get to the relevant item - merge it with the updated one by using spread operators
      return feedback.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
    });
    setFeedbackEditData(EMPTY_FEEDBACK_EDIT_DATA);
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEditData,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export { FeedbackContext, FeedbackProvider };
