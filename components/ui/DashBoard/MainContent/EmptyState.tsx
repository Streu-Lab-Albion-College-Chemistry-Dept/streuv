import { View, Text, StyleSheet } from "react-native";

export function EmptyState(): React.ReactNode {
  return <View style={styles.emptyState}>
    <View style={styles.emptyIcon}>
      <Text style={styles.emptyIconText}>📊</Text>
    </View>
    <Text style={styles.emptyStateText}>No Active Experiments</Text>
    <Text style={styles.emptyStateSubtext}>Use the form to create your first experiment</Text>
  </View>;
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    borderStyle: 'dashed',
  },
  emptyIconText: {
    fontSize: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
  },
})