import { View, Text, StyleSheet } from "react-native";

export function SidebarHeader() {
  return <View style={styles.sidebarHeader}>
    <Text style={styles.sidebarTitle}>Relay Slots</Text>
  </View>;
}

const styles = StyleSheet.create({
  sidebarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    textAlign: 'center',
  },
})