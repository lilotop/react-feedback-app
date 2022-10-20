import React, { createContext, useEffect, useState } from 'react';
// import { Feedback, feedbackData } from '../data/feedbackData';

import { v4 as uuid } from 'uuid';

const JSON_SERVER_URL = `https://5000${window.location.host.slice(4)}`;

type Feedback = {
  id: string;
  rating: number;
  text: string;
};
type FeedbackInput = Omit<Feedback, 'id'>;
type FeedbackContextType = {
  feedback: Array<Feedback>;
  deleteFeedback: (id: string) => void;
  addFeedback: (feedback: FeedbackInput) => void;
  editFeedback: (feedback: Feedback) => void;
  feedbackEditData: FeedbackEditData;
  updateFeedback: (id: string, updatedItem: FeedbackInput) => void;
  isLoading: boolean;
};

type Props = {
  children: React.ReactNode;
};

type FeedbackEditData = {
  isEditing: boolean;
  item?: Feedback;
};
const FeedbackContext = createContext<FeedbackContextType>(
  {} as FeedbackContextType
);
const FeedbackProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<Array<Feedback>>([]);
  const EMPTY_FEEDBACK_EDIT_DATA: FeedbackEditData = {
    // item: {},
    isEditing: false,
  };
  const [feedbackEditData, setFeedbackEditData] = useState(
    EMPTY_FEEDBACK_EDIT_DATA
  );

  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback() {
    // specific to GitPod since all servers are exposed on port 80
    const jsonUrl = JSON_SERVER_URL + '/feedback?_sort=id&_order=desc';

    // credentials: 'include' is only needed inside GitPod to prevent CORS
    // see https://www.gitpod.io/docs/configure/workspaces/ports#cross-origin-resource-sharing-cors
    const response = await fetch(jsonUrl);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  }

  async function deleteFeedback(id: string) {
    await fetch(`${JSON_SERVER_URL}/feedback/${id}`, {
      method: 'DELETE',
    });
    setFeedback(feedback => feedback.filter(item => item.id !== id));
  }

  async function addFeedback(feedbackItem: FeedbackInput) {
    const response = await fetch(JSON_SERVER_URL + '/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackItem),
    });
    const data = await response.json();
    setFeedback(feedback => [data, ...feedback]);
  }

  function editFeedback(item: Feedback) {
    setFeedbackEditData({ item, isEditing: true });
  }

  async function updateFeedback(id: string, updatedItem: FeedbackInput) {
    const response = await fetch(`${JSON_SERVER_URL}/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    setFeedback(feedback => {
      return feedback.map(item =>
        item.id === id ? { ...item, ...data } : item
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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export { FeedbackContext, FeedbackProvider };
