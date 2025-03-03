export interface GetMyLessonsFilter {
  startDate: string;
  endDate: string;
}

export interface Lesson {
  id: string;
  date: string;
  startTime: string;
  endTime: string;

  lecture: {
    id: string;
    title: string;
    place: string;

    book: {
      id: string;
      title: string;
    };
  };
}
