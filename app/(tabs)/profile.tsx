import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Headers from "../../src/components/general/Headers";
import { useLocalSearchParams } from "expo-router";
// openpay:///input?amount=150&recipient=JohnDoe

export default function profile() {
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    if (params.amount) setAmount(String(params.amount));
    if (params.recipient) setRecipient(String(params.recipient));
  }, [params]);

  return (
    <View style={{ backgroundColor: "black", width: "100%", height: "100%" }}>
      <Headers />
      <View style={{ backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>{amount}</Text>
        <Text style={{ color: "white" }}>{recipient}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
