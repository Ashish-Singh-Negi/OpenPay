import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useWalletStore } from "../../stores/wallet-store";

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

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: "100%",
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },

  logoAccent: {
    color: "#3b82f6",
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#1a1a1a",
    gap: 6,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },

  tpsText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
