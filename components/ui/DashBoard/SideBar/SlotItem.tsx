import { View, Text, StyleSheet, ViewProps } from "react-native";
import { RelaySlot, ExperimentSession } from "../../../../shared/types";

interface ISlotItem extends ViewProps {
  slot: string, 
  isActive: boolean, 
  isOccupied: boolean, 
  experiment: [RelaySlot, ExperimentSession]
}
export function SlotItem({
  slot, 
  isActive, 
  isOccupied, 
  experiment,
}: ISlotItem ): React.JSX.Element {
  return <View key={slot} style={styles.slotItem}>
    <View style={styles.slotHeader}>
      <Text style={styles.slotNumber}>{slot.replace('Slot ', '')}</Text>
      <View style={[
        styles.slotStatus,
        {
          backgroundColor: isActive ? '#10b981' : isOccupied ? '#6b7280' : '#374151'
        }
      ]} />
    </View>
    <Text style={styles.slotLabel}>
      {isActive ? 'Running' : isOccupied ? 'Completed' : 'Available'}
    </Text>
    {isOccupied && (
      <Text style={styles.slotUser} numberOfLines={1}>
        {experiment[1].creator}
      </Text>
    )}
  </View>;
}

const styles = StyleSheet.create({
  slotItem: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
    width: '100%',
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  slotNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  slotStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  slotLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 2,
  },
  slotUser: {
    fontSize: 9,
    color: '#64748b',
    fontStyle: 'italic',
  },
})