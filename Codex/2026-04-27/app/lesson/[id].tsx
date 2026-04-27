import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, Check, X } from "lucide-react-native";
import { ProgressBar } from "@/components/ProgressBar";
import { colors } from "@/components/theme";
import { allLessons, modules } from "@/data/courses";
import { useProgress } from "@/store/progress";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = allLessons.find((item) => item.id === id) ?? allLessons[0];
  const module = modules.find((item) => item.lessons.some((candidate) => candidate.id === lesson.id));
  const { completeLesson, progress: userProgress } = useProgress();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [awardedXp, setAwardedXp] = useState(0);

  const question = lesson.questions[step - lesson.content.length];
  const totalSteps = lesson.content.length + lesson.questions.length;
  const progress = finished ? 1 : step / totalSteps;
  const isCorrect = useMemo(() => selected === question?.answerIndex, [question, selected]);

  function next() {
    if (question) {
      const gained = isCorrect ? 1 : 0;
      const nextScore = score + gained;
      setScore(nextScore);
      setSelected(null);
      if (step + 1 >= totalSteps) {
        const ratio = nextScore / lesson.questions.length;
        const xpEarned = userProgress.completedLessons.includes(lesson.id) ? 5 : Math.round(lesson.xp * Math.max(0.5, ratio));
        completeLesson(lesson.id, xpEarned);
        setAwardedXp(xpEarned);
        setFinished(true);
        return;
      }
    }
    setStep((current) => current + 1);
  }

  if (finished) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.result}>
          <Text style={styles.resultKicker}>Lecon terminee</Text>
          <Text style={styles.resultTitle}>+{awardedXp} XP</Text>
          <Text style={styles.resultText}>Score: {score}/{lesson.questions.length}. Ton streak est mis a jour.</Text>
          <Pressable onPress={() => router.replace("/(tabs)")} style={styles.primaryButton}>
            <Text style={styles.primaryText}>Continuer</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <ArrowLeft color={colors.ink} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.module}>{module?.title}</Text>
          <ProgressBar value={progress} color={module?.color ?? colors.green} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!question ? (
          <View style={styles.lessonBlock}>
            <Text style={styles.kicker}>{lesson.minutes} min · {lesson.xp} XP</Text>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.paragraph}>{lesson.content[step]}</Text>
          </View>
        ) : (
          <View style={styles.lessonBlock}>
            <Text style={styles.kicker}>Quiz</Text>
            <Text style={styles.title}>{question.prompt}</Text>
            <View style={styles.options}>
              {question.options.map((option, index) => {
                const chosen = selected === index;
                const reveal = selected !== null;
                const correct = reveal && index === question.answerIndex;
                return (
                  <Pressable
                    key={option}
                    disabled={reveal}
                    onPress={() => setSelected(index)}
                    style={[styles.option, chosen && styles.optionChosen, correct && styles.optionCorrect, reveal && chosen && !correct && styles.optionWrong]}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                    {correct ? <Check color={colors.green} /> : reveal && chosen ? <X color={colors.danger} /> : null}
                  </Pressable>
                );
              })}
            </View>
            {selected !== null && <Text style={styles.explanation}>{question.explanation}</Text>}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable disabled={Boolean(question) && selected === null} onPress={next} style={[styles.primaryButton, Boolean(question) && selected === null && styles.disabled]}>
          <Text style={styles.primaryText}>{step + 1 >= totalSteps ? "Terminer" : "Continuer"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.soft },
  top: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 18, paddingTop: 8, paddingBottom: 14 },
  iconButton: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line },
  module: { color: colors.muted, fontWeight: "800", marginBottom: 7 },
  content: { padding: 22, paddingBottom: 120 },
  lessonBlock: { backgroundColor: colors.white, borderRadius: 28, padding: 22, borderWidth: 1, borderColor: colors.line, minHeight: 360, justifyContent: "center" },
  kicker: { color: colors.green, fontSize: 13, fontWeight: "900", textTransform: "uppercase", marginBottom: 12 },
  title: { color: colors.ink, fontSize: 30, lineHeight: 36, fontWeight: "900", letterSpacing: 0, marginBottom: 18 },
  paragraph: { color: colors.ink, fontSize: 20, lineHeight: 31, fontWeight: "700" },
  options: { gap: 10 },
  option: { minHeight: 58, borderRadius: 18, borderWidth: 2, borderColor: colors.line, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionChosen: { borderColor: colors.blue, backgroundColor: "#EFF6FF" },
  optionCorrect: { borderColor: colors.green, backgroundColor: "#ECFDF3" },
  optionWrong: { borderColor: colors.danger, backgroundColor: "#FEF2F2" },
  optionText: { flex: 1, color: colors.ink, fontWeight: "800", fontSize: 16, lineHeight: 21 },
  explanation: { color: colors.muted, fontWeight: "700", lineHeight: 22, marginTop: 14 },
  footer: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 18, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.line },
  primaryButton: { backgroundColor: colors.green, borderRadius: 18, minHeight: 56, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  disabled: { opacity: 0.45 },
  primaryText: { color: colors.white, fontSize: 17, fontWeight: "900" },
  result: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 14 },
  resultKicker: { color: colors.green, fontWeight: "900", textTransform: "uppercase" },
  resultTitle: { color: colors.ink, fontSize: 54, fontWeight: "900" },
  resultText: { color: colors.muted, fontSize: 17, fontWeight: "700", textAlign: "center", lineHeight: 25 }
});
