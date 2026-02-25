import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const txns = [
  { sig: "asdfasdfa", ok: true, send: false },
  { sig: "asdfasasdfa", ok: true, send: true },
  { sig: "a34sdfasdfa", ok: true, send: false },
];

export default function RecentTransactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecentTransactions</Text>
      <>
        <Text style={styles.title}>RecentTransactions</Text>
        <FlatList
          data={txns}
          keyExtractor={(t) => t.sig}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                Linking.openURL(`https://solscan.io/tx/${item.sig}`)
              }
            >
              <View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: item.send ? "#22c55e" : "#ef4444" },
                    ]}
                  />
                  <Text style={styles.mint}>fg4f7ha...98hv</Text>
                </View>
                <Text style={styles.time}>12:45</Text>
              </View>
              <Text
                style={{
                  color: item.send ? "#14F195" : "#EF4444",
                  fontSize: 11,
                  backgroundColor: "black",
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 16,
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          )}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 14,
    borderRadius: 12,
    width: "100%",
    color: "white",
    marginVertical: 20,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2A2A35",
    marginHorizontal: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  mint: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
  },
  amount: {
    color: "#14F195",
    fontSize: 15,
    fontWeight: "600",
  },
  tokenRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  time: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
});
