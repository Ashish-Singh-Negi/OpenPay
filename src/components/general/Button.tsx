import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useStyles } from "../../../utils/themes/useStyles";
import { AppTheme } from "../../../utils/themes/types";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  iconName?: string;
  iconSize?: number;
}

export default function Button({
  label,
  iconName,
  iconSize = 20,
  style,
  ...props
}: ButtonProps) {
  const styles = useStyles(createStyles);

  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {iconName && (
        <Ionicons name={iconName} size={iconSize} color={styles.label.color} />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    button: {
      backgroundColor: theme.button.primary.bg,
      borderRadius: 28,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.button.primary.text,
    },
  });
}
