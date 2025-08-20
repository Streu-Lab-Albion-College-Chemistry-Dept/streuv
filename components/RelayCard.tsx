
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function RelayIcon() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.relayIcon}>
          <View style={styles.relayCircle} />
          <View style={styles.relayLine} />
          <Text style={styles.relayText}>R</Text>
        </View>
      </View>
      <Text style={styles.mainText}>Relay Controller</Text>
      <Text style={styles.subText}>Hardware Status</Text>
      <View style={styles.statusIndicator}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Online</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  relayIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  relayCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#3b82f6',
  },
  relayLine: {
    position: 'absolute',
    width: 14,
    height: 1.5,
    backgroundColor: '#3b82f6',
  },
  relayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  mainText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 3,
    textAlign: 'center',
  },
  subText: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '400',
    marginBottom: 6,
    textAlign: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 9,
    color: '#10b981',
    fontWeight: '500',
  },
});

