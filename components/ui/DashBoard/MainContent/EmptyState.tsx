import { View, Text, StyleSheet } from "react-native";

export function EmptyState(): React.ReactNode {
  return <View style={styles.emptyState}>
    <Text style={styles.emptyStateText}>No experiments running</Text>
    <Text style={styles.emptyStateSubtext}>Tap the relay icon above to add your first experiment</Text>
  </View>;
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  },
})