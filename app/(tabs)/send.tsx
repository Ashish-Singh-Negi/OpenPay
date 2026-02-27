import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ConnectButton } from "../../src/components/general/ConnectButton";
import { useStyles } from "../../utils/themes/useStyles";
import { AppTheme } from "../../utils/themes/types";
import InputBox from "../../src/components/general/InputBox";
import Button from "../../src/components/general/Button";
import { Dropdown } from "react-native-element-dropdown";
import { Dispatch, SetStateAction, useState } from "react";
import { useTheme } from "../../utils/themes/ThemeContext";

export default function send() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

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
          <CurrencyDropdown
            dropdownLabel="Select currency"
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
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

const currencies = [
  { label: "SOL", value: "SOL" },
  { label: "USDC", value: "USDC" },
];

type CustomDropdownProps = {
  dropdownLabel: string;
  selectedCurrency: { label: string; value: string };
  setSelectedCurrency: Dispatch<
    SetStateAction<{ label: string; value: string }>
  >;
};

function CurrencyDropdown({
  dropdownLabel,
  selectedCurrency,
  setSelectedCurrency,
}: CustomDropdownProps) {
  const { theme } = useTheme();

  const [isFocus, setIsFocus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      gap: 10,
    },
    label: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.textColor.primary,
    },
    input: {
      height: 52,
      paddingHorizontal: 18,
      backgroundColor: theme.bgColor.primary,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: theme.borderColor.primary,
      color: theme.textColor.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{dropdownLabel}</Text>
      <Dropdown
        data={currencies}
        labelField="label"
        valueField="value"
        value={selectedCurrency}
        onChange={(item) => setSelectedCurrency(item.value)}
        placeholder="Select currency"
        style={{
          height: 52,
          paddingHorizontal: 18,
          backgroundColor: theme.bgColor.primary,
          borderRadius: 28,
          borderWidth: 1,
          borderColor: isFocus
            ? theme.borderColor.focused
            : theme.borderColor.primary,
          elevation: 10,
        }}
        containerStyle={{
          backgroundColor: theme.bgColor.secondary,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.borderColor.primary,
          marginTop: 4,
          paddingHorizontal: 4,
          paddingVertical: 6,
        }}
        itemContainerStyle={{
          borderRadius: 10,
          marginHorizontal: 0,
        }}
        itemTextStyle={{
          color: theme.textColor.primary,
          fontSize: 14,
        }}
        selectedTextStyle={{
          color: theme.textColor.primary,
          fontSize: 14,
          fontWeight: "500",
        }}
        placeholderStyle={{
          color: theme.textColor.secondary,
          fontSize: 14,
        }}
        activeColor={theme.bgColor.primary}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
}
