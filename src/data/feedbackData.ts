import { v4 as uuid } from 'uuid';
export type Feedback = {
    id: string,
    rating: number,
    text: string
}
const feedbackData: Array<Feedback> = [
  {
    id: uuid(),
    rating: 10,
    text: 'Just some random thoughts'
  },
  {
    id: uuid(),
    rating: 5,
    text: 'Just some blue thoughts'
  },
  {
    id: uuid(),
    rating: 8,
    text: 'Just some red thoughts'
  },
  {
    id: uuid(),
    rating: 6,
    text: 'Just some yellow thoughts'
  },
  {
    id: uuid(),
    rating: 6,
    text: 'Just some charcoal thoughts'
  }
];

export { feedbackData };    


