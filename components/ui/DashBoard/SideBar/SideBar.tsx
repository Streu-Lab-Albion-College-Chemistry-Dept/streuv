import { View, ScrollView, StyleSheet } from "react-native";
import { RelaySlot, ExperimentSession } from "../../../../shared/types";
import { SidebarHeader } from "./Header";
import { SlotItem } from "./SlotItem";

interface ISideBar {
  allSlots: string[], 
  experiments: [RelaySlot, ExperimentSession][]
}

export function SideBar({
  allSlots,
  experiments,
}: ISideBar) {
  return <View style={styles.sidebar}>
    <SidebarHeader />

    <ScrollView style={styles.sidebarContent} contentContainerStyle={styles.sidebarContentContainer} showsVerticalScrollIndicator={false}>
      {allSlots.map((slot) => {
        const experiment = experiments.find(([s, _]) => s === slot);
        const gauranteedExp = experiment as NonNullable<typeof experiment>
        const isOccupied = !!experiment;
        const isActive = isOccupied && !experiment[1].timeout.expired;

        return (
          <SlotItem
            // tabIndex={slot}
            slot={slot}
            isActive={isActive}
            isOccupied={isOccupied}
            experiment={gauranteedExp} />
        );
      })}
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  sidebar: {
    width: 120,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  sidebarContent: {
    flex: 1,
  },
  sidebarContentContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
    flexGrow: 1,
  },
})