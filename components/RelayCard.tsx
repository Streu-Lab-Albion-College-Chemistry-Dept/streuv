
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RelayForm from './RelayForm';
import { ExperimentSession } from '../shared/types';

interface RelayIconProps {
  onSubmit?: (session: ExperimentSession) => void;
}

export default function RelayIcon({ onSubmit }: RelayIconProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <View>
      {showForm ? (
        <RelayForm
          onSubmit={onSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowForm(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>R</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
});

