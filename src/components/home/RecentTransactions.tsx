import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../utils/themes/ThemeContext";
import { AppTheme } from "../../../utils/themes/types";

const txns = [
  { sig: "asdfasdfa", ok: true, send: false },
  { sig: "asdfasasdfa", ok: true, send: true },
  { sig: "a34sdfasdfa", ok: true, send: false },
];

export default function RecentTransactions() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={txns}
        keyExtractor={(t) => t.sig}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`https://solscan.io/tx/${item.sig}`)}
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
                <Text style={styles.mint}>fg4...98h</Text>
              </View>
              <Text style={styles.time}>12:45</Text>
            </View>
            <Text
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 14,
                color: theme.textColor.secondary,
                fontSize: 10,
                backgroundColor: theme.bgColor.primary,
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 12,
              }}
            >
              View
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor.secondary,
      padding: 12,
      borderRadius: 20,
      width: "100%",
      color: theme.textColor.primary,
      marginVertical: 20,
    },
    title: {
      color: theme.textColor.primary,
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 0,
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      marginBottom: 10,
      borderWidth: 0.5,
      borderColor: theme.borderColor.primary,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 6,
    },
    mint: {
      color: theme.textColor.primary,
      fontSize: 14,
      fontFamily: "monospace",
    },
    amount: {
      color: theme.textColor.primary,
      fontSize: 14,
      fontWeight: "600",
    },
    tokenRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    time: {
      color: theme.textColor.muted,
      fontSize: 10,
      marginTop: 4,
    },
  });
}
