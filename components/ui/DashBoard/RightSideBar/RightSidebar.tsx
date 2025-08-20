import { View, ScrollView, StyleSheet } from "react-native";
import { ConnectionInfo } from "./ConnectionInfo";
import { PerformanceStats } from "./PerformanceStats";
import { QuickStats } from "./QuickStats";
import { RecentActivity } from "./RecentActivity";
import { RightSidebarHeader } from "./RightSideBarHeader";
import { SystemStatus } from "./SystemStatus";

export function RightSideBar() {
  return <View style={styles.rightSidebar}>
    <RightSidebarHeader />
    <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
      <SystemStatus />
      <PerformanceStats />
      <RecentActivity />
      <QuickStats />
      <ConnectionInfo />
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  rightSidebar: {
    width: 180,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  sidebar: {
    width: 120,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  sidebarContent: {
    flex: 1,
    padding: 8,
  },
})