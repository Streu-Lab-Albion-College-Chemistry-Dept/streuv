import { StyleSheet, Text, View } from "react-native";

interface IStatsOverView {
  totalExperiments: number,
  activeExperiments: number,
  completedExperiments: number
}

export default function StatsOverView({totalExperiments, activeExperiments, completedExperiments}: IStatsOverView) {
  return <View style={styles.statsContainer}>
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{totalExperiments}</Text>
      <Text style={styles.statLabel}>Total</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={[styles.statNumber, { color: '#4ade80' }]}>{activeExperiments}</Text>
      <Text style={styles.statLabel}>Active</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={[styles.statNumber, { color: '#64748b' }]}>{completedExperiments}</Text>
      <Text style={styles.statLabel}>Completed</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={[styles.statNumber, { color: '#f59e0b' }]}>{8 - totalExperiments}</Text>
      <Text style={styles.statLabel}>Free Slots</Text>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
})