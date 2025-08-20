import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ApplicationSession } from '../../../../shared/types';

interface IHeader {
  session: ApplicationSession
}

export function Header({ session }: IHeader) {
  return <View style={styles.header}>
    <Text style={styles.title}>Dashboard</Text>
    <Text style={styles.subtitle}>{session.currentuser} • {session.role}</Text>
  </View>;
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
})