import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
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
    <View style={styles.experimentsContainer}>
      <View style={styles.containerHeader}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Running experiments</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{experiments.length}</Text>
          </View>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
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
              <Text style={styles.detailText}>
                {formatDuration(experiment.duration)} • {experiment.cycles} cycles
              </Text>
              {!experiment.timeout.expired ? (
                <Text style={styles.timeRemaining}>
                  {formatTimeRemaining(experiment)} left
                </Text>
              ) : (
                <Text style={styles.expiredText}>Completed</Text>
              )}
            </View>
          </View>
        ))}
        
        {experiments.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No experiments running</Text>
            <Text style={styles.emptySubtext}>Create your first experiment using the form</Text>
          </View>
        )}
      </ScrollView>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#e2e8f0',
    letterSpacing: 0.2,
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  experimentsContainer: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(30, 41, 59, 0.8)',
    overflow: 'hidden',
  },
  containerHeader: {
    padding: 16,
    paddingBottom: 14,
    backgroundColor: 'rgba(2, 6, 23, 0.3)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
  },
  experimentCard: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
    flex: 1,
  },
  experimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deleteButton: {
    width: 24,
    height: 24,
    backgroundColor: '#dc2626',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#fef2f2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  experimentCreator: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 6,
    fontWeight: '500',
  },
  experimentDescription: {
    fontSize: 13,
    color: '#e2e8f0',
    marginBottom: 8,
    lineHeight: 16,
  },
  experimentDetails: {
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  detailText: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 4,
  },
  timeRemaining: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
  },
  expiredText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  moreCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  moreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
  },
  moreSubtext: {
    fontSize: 11,
    color: '#475569',
  },
})