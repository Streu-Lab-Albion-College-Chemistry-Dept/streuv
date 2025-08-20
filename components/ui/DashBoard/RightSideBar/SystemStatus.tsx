import { View, Text, StyleSheet } from "react-native";

export function SystemStatus() {
  return <View style={styles.infoCard}>
    <Text style={styles.infoCardTitle}>System Status</Text>
    <View style={styles.statusItem}>
      <View style={[styles.statusIndicator, { backgroundColor: '#10b981' }]} />
      <Text style={styles.statusText}>Arduino Connected</Text>
    </View>
    <View style={styles.statusItem}>
      <View style={[styles.statusIndicator, { backgroundColor: '#10b981' }]} />
      <Text style={styles.statusText}>All Relays Online</Text>
    </View>
    <View style={styles.statusItem}>
      <View style={[styles.statusIndicator, { backgroundColor: '#f59e0b' }]} />
      <Text style={styles.statusText}>2 Pending Queue</Text>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  infoCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    color: '#94a3b8',
    flex: 1,
  },
})