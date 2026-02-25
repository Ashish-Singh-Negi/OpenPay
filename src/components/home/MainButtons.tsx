import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MainButtons() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={{ gap: 4 }}>
        <TouchableOpacity
          style={styles.send}
          onPress={() => router.navigate("/(e)/qr")}
        >
          <Text style={[styles.btnText, { color: "#1f42ad" }]}>
            Send Crypto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.receive}>
          <Text style={[styles.btnText, { color: "#ffffff" }]}>
            Receive Crypto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    marginBottom: 20,
  },
  send: {
    fontSize: 18,
    padding: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c1dcfd",
  },
  receive: {
    fontSize: 18,
    padding: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f42ad",
  },
  btnText: { fontSize: 20, letterSpacing: -1, fontWeight: 500 },
});
