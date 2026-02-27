import Headers from "../../src/components/general/Headers";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  View,
  Pressable,
} from "react-native";
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import { toByteArray } from "react-native-quick-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConnectButton } from "../../src/components/general/ConnectButton";
import { transferSol } from "../../utils/transferSol";

const APP_IDENTITY = {
  name: "OpenPay",
  uri: "openpay://",
  icon: "favicon.ico",
};
// openpay:///profile?amount=0.5&recipient=HShenUMSPvcDDGuRipU7UariTLVr5eUN4rfrKa5UrqF6
//HShenUMSPvcDDGuRipU7UariTLVr5eUN4rfrKa5UrqF6

function onConnect(publicKey: PublicKey, authToken: string): void {
  console.log("Helllo");
  console.log(publicKey, authToken);
  return;
}
function onError(error: Error): void {
  console.log(error);
}

async function log(recipientAddr: string, amountInSol: number) {
  const log = await transferSol(recipientAddr, amountInSol);
  console.log("log", log);
}

export default function profile() {
  const params = useLocalSearchParams();
  // const [amount, setAmount] = useState(0);
  // const [recipient, setRecipient] = useState("");

  // useEffect(() => {
  //   if (params.amount) setAmount(Number(params.amount));
  //   if (params.recipient) setRecipient(String(params.recipient));
  // }, [params]);

  const amount = params.amount ? Number(params.amount) : 0;
  const recipient = params.recipient ? String(params.recipient) : "";

  return (
    <View style={{ backgroundColor: "black", width: "100%", height: "100%" }}>
      <Headers />
      <View style={{ backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>{amount}</Text>
        <Text style={{ color: "white" }}>{recipient}</Text>
      </View>
      <Pressable
        onPress={() => {
          // if (!recipient) {
          //   Alert.alert("Error", "No recipient address provided");
          //   return;
          // }
          transferSol("7eCr2hyPdmeaJ84hqobHHSKqSSpUp4m79AADVT8eZcn9", 0.2);
        }}
        style={{ padding: 10, backgroundColor: "blue" }}
      >
        <Text style={{ color: "white" }}>Log</Text>
      </Pressable>

      {/* <ConnectButton onConnect={onConnect} onError={onError} /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
