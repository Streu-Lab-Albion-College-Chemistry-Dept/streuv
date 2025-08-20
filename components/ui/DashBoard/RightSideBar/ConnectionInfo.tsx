import { StyleSheet, Text, View } from "react-native";

export function ConnectionInfo() {
  return <View style={styles.infoCard}>
    <Text style={styles.infoCardTitle}>Connection</Text>
    <View style={styles.connectionItem}>
      <Text style={styles.connectionLabel}>Arduino</Text>
      <Text style={styles.connectionValue}>COM3 @ 9600</Text>
    </View>
    <View style={styles.connectionItem}>
      <Text style={styles.connectionLabel}>Network</Text>
      <Text style={styles.connectionValue}>192.168.1.100</Text>
    </View>
    <View style={styles.connectionItem}>
      <Text style={styles.connectionLabel}>Last Ping</Text>
      <Text style={styles.connectionValue}>12ms</Text>
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
    alignItems: 'center',
    width: '100%',
  },
  infoCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  connectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    width: '100%',
  },
  connectionLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  connectionValue: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
})