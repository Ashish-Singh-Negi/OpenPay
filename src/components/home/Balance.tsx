import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useWalletStore } from "../../stores/wallet-store";

const LAMPORTS_PER_SOL = 1_000_000_000;

export default function Balance() {
  const updateBalance = useWalletStore((s) => s.updateBalance);

  const [lamports, setLamports] = useState<number | null>(null);
  const [prices, setPrices] = useState<{
    solUsd: number;
    ethUsd: number;
  } | null>(null);

  useEffect(() => {
    const getBalance = async () => {
      const response = await fetch("https://api.devnet.solana.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [
            "EmzwsPbxRnTE2Du3Tj6Q7wU9v4xSsYS28csGDor3Md32",
            { commitment: "finalized" },
          ],
        }),
      });

      const data = await response.json();
      updateBalance(data.result.value);
      setLamports(data.result.value);
    };

    const getPrices = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum&vs_currencies=usd",
      );
      const data = await res.json();

      setPrices({
        solUsd: data.solana.usd,
        ethUsd: data.ethereum.usd,
      });
    };

    getBalance();
    getPrices();
  }, []);

  if (!lamports || !prices) return null;

  const sol = lamports / LAMPORTS_PER_SOL;
  const usdc = sol * prices.solUsd;
  const eth = usdc / prices.ethUsd;

  return (
    <View style={styles.container}>
      <View style={styles.innerC1}>
        <Text style={styles.title}>Balance</Text>
        <Text style={styles.time}>{Date.now()}</Text>
      </View>

      <View style={styles.innerC2}>
        <Text style={styles.primary}>{sol.toFixed(4)} </Text>
        <Text style={styles.currency}>SOL</Text>
      </View>

      <View style={styles.conversions}>
        <Text style={styles.secondary}>≈ {usdc.toFixed(2)} USDC</Text>
        <Text style={styles.secondary}>≈ {eth.toFixed(6)} ETH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    color: "white",
  },

  innerC1: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: -1,
  },
  time: {},

  innerC2: { flexDirection: "row", alignItems: "flex-end" },
  primary: {
    color: "white",
    fontSize: 50,
    fontWeight: 800,
    lineHeight: 40,
    letterSpacing: -2,
  },
  currency: { color: "white", fontSize: 20, fontWeight: 800, marginLeft: -8 },

  conversions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  secondary: {
    color: "#9ca3af",
    fontSize: 13,
  },
});
