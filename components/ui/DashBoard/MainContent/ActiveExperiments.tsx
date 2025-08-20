import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RelaySlot, ExperimentSession } from "../../../../shared/types";

interface IActiveExperiments {
  experiments: [RelaySlot, ExperimentSession][]
  deleteSession: (slot: RelaySlot) => void
  formatDuration: (timeConfig: any) => string
  formatTimeRemaining: (experiment: ExperimentSession) => string
}

export function ActiveExperiments({
  experiments, 
  deleteSession, 
  formatDuration, 
  formatTimeRemaining
}: IActiveExperiments): React.ReactNode {
  return <View style={styles.section}>
    <Text style={styles.sectionTitle}>Running Experiments</Text>
    {experiments.map(([slot, experiment]) => (
      <View key={slot} style={styles.experimentCard}>
        <View style={styles.experimentHeader}>
          <View style={styles.slotInfo}>
            <Text style={styles.slotName}>{slot}</Text>
            <View style={[
              styles.statusDot,
              { backgroundColor: experiment.timeout.expired ? '#64748b' : '#4ade80' }
            ]} />
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteSession(slot)}
          >
            <Text style={styles.deleteText}>×</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.experimentCreator}>
          {experiment.creator} ({experiment.role})
        </Text>

        <Text style={styles.experimentDescription} numberOfLines={2}>
          {experiment.description || 'No description provided'}
        </Text>

        <View style={styles.experimentDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{formatDuration(experiment.duration)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Cycles:</Text>
            <Text style={styles.detailValue}>{experiment.cycles}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Delay:</Text>
            <Text style={styles.detailValue}>{formatDuration(experiment.delay)}</Text>
          </View>
        </View>

        <View style={styles.experimentFooter}>
          <Text style={styles.dateText}>{experiment.date}</Text>
          {!experiment.timeout.expired && (
            <Text style={styles.timeRemaining}>
              Time remaining: {formatTimeRemaining(experiment)}
            </Text>
          )}
          {experiment.timeout.expired && (
            <Text style={styles.expiredText}>Completed</Text>
          )}
        </View>
      </View>
    ))}
  </View>;
}

const styles = StyleSheet.create({
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#f1f5f9',
    fontWeight: '600',
  },
  experimentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  dateText: {
    fontSize: 12,
    color: '#64748b',
  },
  experimentCreator: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
    fontWeight: '500',
  },
  experimentDescription: {
    fontSize: 15,
    color: '#e2e8f0',
    marginBottom: 16,
    lineHeight: 20,
  },
  experimentDetails: {
    backgroundColor: '#020617',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  
  
  timeRemaining: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '600',
  },

  deleteButton: {
    width: 32,
    height: 32,
    backgroundColor: '#dc2626',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#fef2f2',
    fontSize: 18,
    fontWeight: 'bold',
  },

  experimentCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  experimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8fafc',
    marginRight: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  section: {
    marginBottom: 24,
  },
  
  expiredText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 16,
  },
})