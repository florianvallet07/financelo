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
      finishOnboarding(objective, level, initialXp) {
        setProgress((current) => ({
          ...current,
          hasOnboarded: true,
          objective,
          level,
          xp: current.xp + initialXp,
          badges: awardBadges({ ...current, objective, level, xp: current.xp + initialXp })
        }));
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
            xp: current.xp + xp,
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
