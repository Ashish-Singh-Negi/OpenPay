import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useWalletStore } from "../../stores/wallet-store";
import { useTheme } from "../../../utils/themes/ThemeContext";
import { AppTheme } from "../../../utils/themes/types";

export default function Headers() {
  const [TPS, setTPS] = useState<number | null>(null);
  const chainHealth = useWalletStore((s) => s.chainHealth);
  const toggleHealth = useWalletStore((s) => s.toggleChainHealth);

  useEffect(() => {
    const getHealth = async () => {
      const response = await fetch("https://api.devnet.solana.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getHealth",
        }),
      });

      const data = await response.json();
      toggleHealth(data.result === "ok");
    };

    const fetchSamples = async () => {
      try {
        const response = await fetch("https://api.devnet.solana.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getRecentPerformanceSamples",
            params: [2],
          }),
        });

        const data = await response.json();
        setTPS(
          Math.floor(
            data.result[0].numTransactions / data.result[0].samplePeriodSecs,
          ),
        );
      } catch (err) {
        console.error(err);
      }
    };

    getHealth();
    fetchSamples();

    const interval = setInterval(fetchSamples, 600 * 1000);
    return () => clearInterval(interval);
  }, []);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>
        SOL<Text style={styles.logoAccent}>Pay</Text>
      </Text>

      {/* Status Pill */}
      <View style={styles.statusPill}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: chainHealth ? "#22c55e" : "#ef4444" },
          ]}
        />
        {TPS !== null && <Text style={styles.tpsText}>{TPS} TPS</Text>}
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      height: 72,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    logo: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.logo.primary,
      letterSpacing: 0.5,
    },

    logoAccent: {
      color: theme.logo.secondary,
    },

    statusPill: {
      height: 36,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: theme.bgColor.secondary,
      gap: 6,
    },

    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },

    tpsText: {
      color: theme.textColor.primary,
      fontSize: 13,
      fontWeight: "600",
    },
  });
}
