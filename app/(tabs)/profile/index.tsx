import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import { toByteArray } from "react-native-quick-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConnectButton } from "../../../src/components/general/ConnectButton";
import { transferSol } from "../../../utils/transferSol";
import { useStyles } from "../../../utils/themes/useStyles";
import { AppTheme } from "../../../utils/themes/types";
import ToggleBtn from "../../../src/components/general/ToggleBtn";
import Button from "../../../src/components/general/Button";
import NavigationBtn from "../../../src/components/general/NavigationBtn";
import { useTheme } from "../../../utils/themes/ThemeContext";

const APP_IDENTITY = {
  name: "OpenPay",
  uri: "openpay://",
  icon: "favicon.ico",
};
// openpay:///profile?amount=0.5&recipient=HShenUMSPvcDDGuRipU7UariTLVr5eUN4rfrKa5UrqF6
//HShenUMSPvcDDGuRipU7UariTLVr5eUN4rfrKa5UrqF6

async function log(recipientAddr: string, amountInSol: number) {
  const log = await transferSol(recipientAddr, amountInSol);
  console.log("log", log);
}
transferSol("7eCr2hyPdmeaJ84hqobHHSKqSSpUp4m79AADVT8eZcn9", 0.0002);

export default function profile() {
  const params = useLocalSearchParams();

  function onConnect(publicKey: PublicKey, authToken: string): void {
    console.log("Helllo");
    console.log(publicKey, authToken);
    return;
  }
  function onError(error: Error): void {
    console.log(error);
  }

  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    if (params.amount) setAmount(Number(params.amount));
    if (params.recipient) setRecipient(String(params.recipient));
  }, [params]);

  // const amount = params.amount ? Number(params.amount) : 0;
  // const recipient = params.recipient ? String(params.recipient) : "";
  // transferSol("7eCr2hyPdmeaJ84hqobHHSKqSSpUp4m79AADVT8eZcn9", 0.2);

  const [merchantMode, setMerchantMode] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      {/* Connected wallet */}
      <View style={[styles.colContainer, { gap: 10 }]}>
        <Text style={styles.title}>Connected wallet</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.walletAddressText}>asd......gkf</Text>
          <TouchableOpacity style={styles.copyBtn}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Current Balance */}
      <View style={[styles.colContainer]}>
        <View style={[styles.rowContainer]}>
          <Text style={[styles.secondaryText]}>Balance</Text>
          <Text style={styles.mutedText}>{Date.now()}</Text>
        </View>
        <View>
          <Text style={styles.primaryText}>
            {(12.3332).toFixed(4)}{" "}
            <Text style={[styles.secondaryText]}>SOL</Text>
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.mutedText}>≈ {(12).toFixed(2)} USDC</Text>
          <Text style={styles.mutedText}>≈ {(1).toFixed(6)} ETH</Text>
        </View>
      </View>

      <View style={[styles.colContainer, { gap: 8, paddingHorizontal: 0 }]}>
        {/* Merchant mode toggle */}
        <ToggleBtn
          label="Merchant mode"
          active={merchantMode}
          onPress={() => setMerchantMode((prev) => !prev)}
        />

        <NavigationBtn
          label="Dashboard"
          route="/profile/dashboard"
          iconName={"arrow-forward-outline"}
        />

        {/* Toggle dark mode */}
        <ToggleBtn
          label="Dark mode"
          active={isDark}
          onPress={() => toggleTheme()}
        />
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor.primary,
      paddingVertical: 16,
      paddingHorizontal: 14,
      gap: 20,
      // justifyContent: "space-between",
    },
    title: {
      color: theme.textColor.primary,
      fontSize: 16,
      fontWeight: "500",
    },
    colContainer: {
      backgroundColor: theme.bgColor.primary,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
    },
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 20,
    },
    walletAddressText: {
      color: theme.textColor.secondary,
      fontSize: 14,
    },
    copyBtn: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      backgroundColor: theme.button.primary.bg,
    },
    copyText: {
      color: theme.button.primary.text,
      fontSize: 12,
      fontWeight: "500",
    },
    currentBalLabelText: {
      color: theme.textColor.primary,
      fontSize: 28,
    },
    primaryText: {
      color: theme.textColor.primary,
      fontSize: 50,
      fontWeight: "500",
    },
    secondaryText: {
      color: theme.textColor.primary,
      fontSize: 28,
    },
    mutedText: {
      color: theme.textColor.muted,
    },
  });
}
