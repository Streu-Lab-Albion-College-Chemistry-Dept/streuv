import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useExperimentStore } from '../../../ctx/stores/ExperimentStore';
import { MainContent } from './MainContent/MainContent';
import { SideBar } from './SideBar/SideBar';
import { RightSideBar } from './RightSideBar/RightSidebar';
import { ExperimentSession, TimeConfig } from '../../../shared/types';

export default function DashBoard(): React.JSX.Element {
  const { Store, session, deleteSession } = useExperimentStore();
  
  const experiments = Array.from(Store.entries());
  
  const totalExperiments = experiments.length;
  const activeExperiments = experiments.filter(([_, exp]) => !exp.timeout.expired).length;
  const completedExperiments = totalExperiments - activeExperiments;

  const formatTimeRemaining = (experiment: ExperimentSession) => {
    const totalMs = experiment.timeout.timeoutMs;
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const formatDuration = (timeConfig: TimeConfig) => {
    const { hours, minutes, seconds } = timeConfig;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const allSlots = ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5", "Slot 6", "Slot 7", "Slot 8"];

  return (
    <View style={styles.container}>
      <SideBar 
        allSlots={allSlots}
        experiments={experiments}
      />
      <MainContent 
        session={session}
        totalExperiments={totalExperiments}
        activeExperiments={activeExperiments}
        completedExperiments={completedExperiments}
        deleteSession={deleteSession}
        formatDuration={formatDuration}
        formatTimeRemaining={formatTimeRemaining}
        experiments={experiments}
      />
      <RightSideBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0f0f23',
    padding: 12,
    gap: 12,
  },  
});

