import { Header } from "./Header";
import { ScrollView, StyleSheet } from "react-native";
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
  return <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
    {/* Header */}
    <Header session={session} />
    {/* Stats Overview */}
    <StatsOverView
      totalExperiments={totalExperiments}
      activeExperiments={activeExperiments}
      completedExperiments={completedExperiments} />

    {/* Add Experiment */}
    <AddExperiment />

    {/* Active Experiments */}
    {experiments.length > 0 && (
      <ActiveExperiments
        experiments={experiments}
        deleteSession={deleteSession}
        formatDuration={formatDuration}
        formatTimeRemaining={formatTimeRemaining} />
    )}

    {/* Empty State */}
    {experiments.length === 0 && (
      <EmptyState />
    )}
  </ScrollView>;
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#16213e',
    marginRight: 12,
  },
})