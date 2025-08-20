import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ApplicationSession } from '../../../../shared/types';

interface IHeader {
  session: ApplicationSession
}

export function Header({ session }: IHeader) {
  return <View style={styles.header}>
    <Text style={styles.title}>Experiment Dashboard</Text>
    <Text style={styles.subtitle}>User: {session.currentuser} ({session.role})</Text>
  </View>;
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#94a3b8',
  },
})