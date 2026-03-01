import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppTheme } from "../../../utils/themes/types";
import { useStyles } from "../../../utils/themes/useStyles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type NavigationBtnProps = { label: string; route: string; iconName: string };

export default function NavigationBtn({
  label,
  route = "/",
  iconName,
  ...props
}: NavigationBtnProps) {
  const router = useRouter();

  const styles = useStyles(createStyles);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push(route)}
      {...props}
    >
      <Text style={styles.label}>{label}</Text>
      {iconName && <Ionicons style={styles.link} name={iconName} size={24} />}
    </TouchableOpacity>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 20,
      backgroundColor: theme.bgColor.secondary,
      paddingVertical: 16,
      paddingHorizontal: 16,
      color: theme.textColor.primary,
    },
    label: {
      fontSize: 14,
      color: theme.textColor.primary,
    },
    link: {
      color: theme.textColor.link,
    },
  });
}
