export type Level = "debutant" | "intermediaire" | "avance";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

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
  xp: number;
  streak: number;
  lastActivityDate?: string;
  completedLessons: string[];
  badges: string[];
};
