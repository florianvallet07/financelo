          </View>
        )}

        {step === "result" && (
          <View style={[styles.card, shadow]}>
            <View style={styles.iconBubble}>
              <BadgeCheck color={colors.green} size={34} strokeWidth={2.7} />
            </View>
            <Text style={styles.kicker}>+{INITIAL_XP} XP debloques</Text>
            <Text style={styles.title}>Ton niveau est : {levelLabel(detectedLevel)}</Text>
            <Text style={styles.subtitle}>{levelMessage(detectedLevel)}</Text>
            <Pressable onPress={finish} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Text style={styles.primaryText}>Commencer ma premiere mission</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1, padding: 22 },
  header: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 18 },
  brand: { color: colors.ink, fontSize: 24, fontWeight: "900", letterSpacing: 0 },
  progressWrap: { marginBottom: 18 },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.line,
    justifyContent: "center",
    gap: 18
  },
  iconBubble: { width: 74, height: 74, borderRadius: 26, backgroundColor: "#EFFFF5", alignItems: "center", justifyContent: "center", alignSelf: "center" },
  kicker: { color: colors.green, fontSize: 13, fontWeight: "900", textTransform: "uppercase", textAlign: "center" },
  title: { color: colors.ink, fontSize: 31, lineHeight: 37, fontWeight: "900", letterSpacing: 0, textAlign: "center" },
  subtitle: { color: colors.muted, fontSize: 17, lineHeight: 25, fontWeight: "700", textAlign: "center" },
  options: { gap: 10 },
  option: { minHeight: 58, borderRadius: 18, borderWidth: 2, borderColor: colors.line, padding: 14, justifyContent: "center", backgroundColor: colors.white },
  optionSelected: { borderColor: colors.green, backgroundColor: "#F0FFF5" },
  optionText: { color: colors.ink, fontWeight: "900", fontSize: 16, textAlign: "center", lineHeight: 21 },
  primaryButton: {
    minHeight: 58,
    borderRadius: 22,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14
  },
  disabled: { opacity: 0.45 },
  pressed: { transform: [{ scale: 0.99 }] },
  primaryText: { color: colors.white, fontSize: 17, fontWeight: "900", textAlign: "center" }
});
