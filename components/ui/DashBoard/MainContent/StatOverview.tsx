import { StyleSheet, Text, View } from "react-native";
import { RelaySlot, ExperimentSession } from "../../../../shared/types";

interface IStatsOverView {
  totalExperiments: number,
  activeExperiments: number,
  completedExperiments: number,
  experiments: [RelaySlot, ExperimentSession][]
}

export default function StatsOverView({totalExperiments, activeExperiments, completedExperiments, experiments}: IStatsOverView) {
  // Calculate average duration of active experiments
  const activeExps = experiments.filter(([_, exp]) => !exp.timeout.expired);
  const avgDurationMinutes = activeExps.length > 0 
    ? Math.round(activeExps.reduce((sum, [_, exp]) => {
        return sum + exp.duration.hours * 60 + exp.duration.minutes + exp.duration.seconds / 60;
      }, 0) / activeExps.length)
    : 0;

  // Calculate experiments expiring in next 30 minutes
  const expiringSoon = activeExps.filter(([_, exp]) => {
    const timeLeftMs = exp.timeout.timeoutMs;
    return timeLeftMs <= 30 * 60 * 1000; // 30 minutes in ms
  }).length;

  // Calculate most common role
  const roleCounts = experiments.reduce((acc, [_, exp]) => {
    acc[exp.role] = (acc[exp.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topRole = Object.entries(roleCounts).reduce((a, b) => 
    roleCounts[a[0]] > roleCounts[b[0]] ? a : b, ['none', 0]
  )[0];

  // Calculate slot utilization percentage
  const utilizationPercent = Math.round((totalExperiments / 8) * 100);

  return <View style={styles.statsContainer}>
    <View style={styles.statCard}>
      <Text style={[styles.statNumber, { color: '#4ade80' }]}>{activeExperiments}</Text>
      <Text style={styles.statLabel}>Active</Text>
    </View>
    <View style={[styles.statCard, expiringSoon > 0 && styles.urgentCard]}>
      <Text style={[styles.statNumber, { color: expiringSoon > 0 ? '#ef4444' : '#f59e0b' }]}>{expiringSoon}</Text>
      <Text style={styles.statLabel}>Expiring Soon</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={[styles.statNumber, { color: '#8b5cf6' }]}>{avgDurationMinutes}m</Text>
      <Text style={styles.statLabel}>Avg Duration</Text>
    </View>
    <View style={[styles.statCard, utilizationPercent >= 90 && styles.warningCard]}>
      <Text style={[styles.statNumber, { 
        color: utilizationPercent >= 90 ? '#ef4444' : utilizationPercent >= 70 ? '#f59e0b' : '#06b6d4' 
      }]}>{utilizationPercent}%</Text>
      <Text style={styles.statLabel}>Slot Usage</Text>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  statsContainer: {
    flex: 2,
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  urgentCard: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  warningCard: {
    borderColor: 'rgba(245, 158, 11, 0.3)',
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
  },
})