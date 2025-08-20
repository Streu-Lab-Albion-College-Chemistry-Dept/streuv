import { Header } from "./Header";
import { View, StyleSheet } from "react-native";
import { ApplicationSession, RelaySlot, ExperimentSession } from "../../../../shared/types";
import { ActiveExperiments } from "./ActiveExperiments";
import { AddExperiment } from "./AddExperiment";
import { EmptyState } from "./EmptyState";
import StatsOverView from "./StatOverview";

interface IMainContent {
  session: ApplicationSession, 
  totalExperiments: number, 
  activeExperiments: number, 
  completedExperiments: number, 
  experiments: [RelaySlot, ExperimentSession][], 
  deleteSession: (slot: RelaySlot) => void, 
  formatDuration: (timeConfig: any) => string, 
  formatTimeRemaining: (experiment: ExperimentSession) => string
}

export function MainContent({
  session, 
  totalExperiments, 
  activeExperiments, 
  completedExperiments, 
  experiments, 
  deleteSession, 
  formatDuration,
  formatTimeRemaining
}: IMainContent) {
  return <View style={styles.mainContent}>
    <View style={styles.mainContentContainer}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Header session={session} />
        <StatsOverView
          totalExperiments={totalExperiments}
          activeExperiments={activeExperiments}
          completedExperiments={completedExperiments}
          experiments={experiments} />
      </View>

      {/* Content Row */}
      <View style={styles.contentRow}>
        {/* Left Column - Form */}
        <View style={styles.leftColumn}>
          <AddExperiment />
        </View>

        {/* Right Column - Experiments */}
        <View style={styles.rightColumn}>
          {experiments.length > 0 ? (
            <ActiveExperiments
              experiments={experiments}
              deleteSession={deleteSession}
              formatDuration={formatDuration}
              formatTimeRemaining={formatTimeRemaining} />
          ) : (
            <EmptyState />
          )}
        </View>
      </View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#16213e',
    marginHorizontal: 12,
  },
  mainContentContainer: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 120,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
})