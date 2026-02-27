import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useStyles } from "../../../utils/themes/useStyles";
import { AppTheme } from "../../../utils/themes/types";
import { useTheme } from "../../../utils/themes/ThemeContext";
import { useState } from "react";
import { colorPalette } from "../../../utils/themes/colorPalette";

type InputBoxProps = TextInputProps & {
  label: string;
  placeholder: string;
};

export default function InputBox({
  label,
  placeholder,
  ...props
}: InputBoxProps) {
  const [isFocused, setIsFocused] = useState(false);

  const { theme } = useTheme();
  const styles = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && {
            borderColor: colorPalette.blue[500],
          },
        ]}
        placeholderTextColor={theme.textColor.muted}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      gap: 10,
    },
    label: {
      fontSize: 14,
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
}
