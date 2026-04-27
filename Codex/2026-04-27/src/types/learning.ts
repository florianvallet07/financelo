export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  xp: number;
  summary: string;
  content: string[];
  questions: QuizQuestion[];
};

export type CourseModule = {
  id: string;
  title: string;
  theme: string;
  color: string;
  lessons: Lesson[];
};

export type ProgressState = {
  hasOnboarded: boolean;
  level: Level;
  objective?: UserObjective;
  xp: number;
  streak: number;
  lastActivityDate?: string;
  completedLessons: string[];
  badges: string[];
};
