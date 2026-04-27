import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { isToday, isYesterday, todayKey } from "@/lib/date";
import { Level, ProgressState } from "@/types/learning";

const STORAGE_KEY = "financelo.progress.v1";

const initialProgress: ProgressState = {
  hasOnboarded: false,
  level: "debutant",
  xp: 0,
  streak: 0,
  completedLessons: [],
  badges: []
};

type ProgressContextValue = {
  progress: ProgressState;
  isReady: boolean;
  setLevel: (level: Level) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function awardBadges(next: ProgressState) {
  const badges = new Set(next.badges);
  if (next.xp >= 50) badges.add("Premier capital");
  if (next.streak >= 3) badges.add("Serie chaude");
  if (next.completedLessons.length >= 3) badges.add("Apprenti investisseur");
  if (next.xp >= 100) badges.add("Mentalite long terme");
  return [...badges];
}

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState<ProgressState>(initialProgress);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved) setProgress({ ...initialProgress, ...JSON.parse(saved) });
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (isReady) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [isReady, progress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      isReady,
      setLevel(level) {
        setProgress((current) => ({ ...current, hasOnboarded: true, level }));
      },
      completeLesson(lessonId, xp) {
        setProgress((current) => {
          const alreadyDone = current.completedLessons.includes(lessonId);
          const activityDate = todayKey();
          const nextStreak = isToday(current.lastActivityDate)
            ? current.streak
            : isYesterday(current.lastActivityDate)
              ? current.streak + 1
              : 1;

          const next: ProgressState = {
            ...current,
            xp: current.xp + (alreadyDone ? 5 : xp),
            streak: nextStreak,
            lastActivityDate: activityDate,
            completedLessons: alreadyDone ? current.completedLessons : [...current.completedLessons, lessonId]
          };

          return { ...next, badges: awardBadges(next) };
        });
      },
      resetProgress() {
        setProgress(initialProgress);
      }
    }),
    [isReady, progress]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
