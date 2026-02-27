import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ConnectButton } from "../../src/components/general/ConnectButton";
import { useStyles } from "../../utils/themes/useStyles";
import { AppTheme } from "../../utils/themes/types";
import InputBox from "../../src/components/general/InputBox";
import Button from "../../src/components/general/Button";

export default function send() {
  const pubKey = "EmzwsPbxRnTE2Du3Tj6Q7wU9v4xSsYS28csGDor3Md32";

  const styles = useStyles(createStyles);

  return (
    // wrapper to dismiss keyboard and remove focus from TextInput tag
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Send Money</Text>
          <InputBox
            label="Enter wallet address"
            placeholder="Enter receiver address..."
            keyboardType="default"
          />
          {/*  */}
          <InputBox
            label="Select currency"
            placeholder="USDC"
            keyboardType="visible-password"
          />
          <InputBox
            label="Amount"
            placeholder="0.00"
            keyboardType="decimal-pad"
          />
          <ConnectButton
            onConnect={(pubKey, authToken) => {
              console.log(pubKey, authToken);
            }}
            onError={(error) => {
              console.log(error);
            }}
          />
          <Button label="Proceed" />
        </View>
        <View style={styles.quickActionContainer}>
          <Button
            label="Scan QR"
            iconName="qr-code-outline"
            style={{ flex: 1, paddingVertical: 20, borderRadius: 32 }}
          />
          <Button
            label="NFC"
            iconName="wifi"
            style={{ flex: 1, paddingVertical: 20, borderRadius: 32 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
      justifyContent: "space-between",
    },
    formContainer: {
      backgroundColor: theme.bgColor.secondary,
      borderRadius: 20,
      padding: 14,
      gap: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.textColor.primary,
    },
    quickActionContainer: {
      flexDirection: "row",
      gap: 10,
    },
  });
}
