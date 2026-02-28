import {
  Clipboard,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppTheme } from "../../utils/themes/types";
import { useStyles } from "../../utils/themes/useStyles";
import Button from "../../src/components/general/Button";

export default function ReceiveScreen() {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.qrContainer}>{/* QR code here */}</View>
        <Button
          label="Share QR"
          iconName="share-outline"
          style={{ paddingHorizontal: 24 }}
        />
        <View style={styles.walletAddressBlock}>
          <Text style={styles.walletAddressText}>asd......gkf</Text>
          <TouchableOpacity style={styles.copyBtn}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor.primary,
      paddingHorizontal: 14,
      paddingVertical: 16,
    },
    mainContainer: {
      backgroundColor: theme.bgColor.secondary,
      alignItems: "center",
      gap: 32,
      paddingVertical: 40,
      borderRadius: 20,
    },
    qrContainer: {
      height: 260,
      width: 260,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
    },
    walletAddressBlock: {
      width: "80%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.bgColor.primary,
      paddingLeft: 14,
      paddingRight: 10,
      paddingVertical: 8,
      borderRadius: 20,
    },
    walletAddressText: {
      color: theme.textColor.secondary,
      fontSize: 12,
    },
    copyBtn: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      backgroundColor: theme.button.secondary.bg,
    },
    copyText: {
      color: theme.button.secondary.text,
      fontSize: 12,
      fontWeight: "500",
    },
  });
}
