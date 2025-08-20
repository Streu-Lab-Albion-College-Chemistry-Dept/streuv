import { View, Text, StyleSheet } from "react-native";

export function RecentActivity() {
  return <View style={styles.infoCard}>
    <Text style={styles.infoCardTitle}>Activity Log</Text>
    {[
      { time: '14:32', event: 'Slot 3 completed', type: 'success' },
      { time: '14:28', event: 'New experiment queued', type: 'info' },
      { time: '14:15', event: 'Slot 1 started', type: 'success' },
      { time: '13:45', event: 'System health check', type: 'info' },
      { time: '13:30', event: 'User login: john_doe', type: 'info' }
    ].map((log, index) => (
      <View key={index} style={styles.logItem}>
        <Text style={styles.logTime}>{log.time}</Text>
        <Text style={[
          styles.logEvent,
          { color: log.type === 'success' ? '#10b981' : '#64748b' }
        ]} numberOfLines={2}>
          {log.event}
        </Text>
      </View>
    ))}
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
  logItem: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  logTime: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 2,
  },
  logEvent: {
    fontSize: 10,
    lineHeight: 12,
  },
})