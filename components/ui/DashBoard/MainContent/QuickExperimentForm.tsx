import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { 
  Role, 
  TimeConfig, 
  RelaySlot, 
  ExperimentSession 
} from '../../../../shared/types';
import { useExperimentStore } from '../../../../ctx/stores/ExperimentStore';
import { createSessionTimeout } from '../../../../shared/utils';

interface DropdownProps {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={[
                styles.dropdownOptionText,
                value === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export function QuickExperimentForm() {
  const { setSession } = useExperimentStore();
  const [formData, setFormData] = useState({
    creator: '',
    role: '' as Role,
    email: '',
    slot: '' as RelaySlot,
    duration: { hours: 0, minutes: 30, seconds: 0 },
    delay: { hours: 0, minutes: 0, seconds: 0 },
    cycles: 1,
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const roleOptions: Role[] = ['student', 'instructor', 'system'];
  const slotOptions: RelaySlot[] = [
    'Slot 1', 'Slot 2', 'Slot 3', 'Slot 4',
    'Slot 5', 'Slot 6', 'Slot 7', 'Slot 8'
  ];

  const updateTimeConfig = (type: 'duration' | 'delay', field: keyof TimeConfig, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: numValue,
      }
    }));
  };

  const handleSubmit = () => {
    if (!formData.creator.trim() || !formData.role || !formData.email.trim() || 
        !formData.slot || !formData.description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Note: The timeout will be created by the store's setSession method
    const experimentSession: Omit<ExperimentSession, 'timeout'> = {
      creator: formData.creator.trim(),
      role: formData.role,
      email: formData.email.trim(),
      slot: formData.slot,
      duration: formData.duration,
      delay: formData.delay,
      cycles: formData.cycles,
      date: formData.date,
      description: formData.description.trim(),
    };
    
    const result = setSession(experimentSession as ExperimentSession);
    if ('Ok' in result) {
      setFormData({
        creator: '',
        role: '' as Role,
        email: '',
        slot: '' as RelaySlot,
        duration: { hours: 0, minutes: 30, seconds: 0 },
        delay: { hours: 0, minutes: 0, seconds: 0 },
        cycles: 1,
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
      Alert.alert('Success', 'Experiment created successfully!');
    } else {
      Alert.alert('Error', 'Slot already taken');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Quick Experiment Setup</Text>
      
      {/* User Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Information</Text>
        
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Creator Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.creator}
              onChangeText={(text) => setFormData(prev => ({ ...prev, creator: text }))}
              placeholder="Enter your full name"
              placeholderTextColor="#64748b"
              autoCapitalize="words"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role *</Text>
            <Dropdown
              value={formData.role}
              options={roleOptions}
              onSelect={(value) => setFormData(prev => ({ ...prev, role: value as Role }))}
              placeholder="Select role"
            />
          </View>
        </View>

        <View style={styles.fullWidth}>
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder="your.email@domain.com"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Experiment Configuration Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiment Configuration</Text>
        
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Relay Slot *</Text>
            <Dropdown
              value={formData.slot}
              options={slotOptions}
              onSelect={(value) => setFormData(prev => ({ ...prev, slot: value as RelaySlot }))}
              placeholder="Select slot"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cycles</Text>
            <TextInput
              style={styles.input}
              value={formData.cycles.toString()}
              onChangeText={(text) => setFormData(prev => ({ ...prev, cycles: Math.max(1, parseInt(text) || 1) }))}
              placeholder="1"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.fullWidth}>
          <Text style={styles.label}>Scheduled Date</Text>
          <TextInput
            style={styles.input}
            value={formData.date}
            onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      {/* Timing Configuration Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timing Configuration</Text>
        
        <View style={styles.timingGroup}>
          <Text style={styles.timingLabel}>Experiment Duration</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeInputLabel}>Hours</Text>
              <TextInput
                style={styles.timeInput}
                value={formData.duration.hours.toString()}
                onChangeText={(text) => updateTimeConfig('duration', 'hours', text)}
                placeholder="0"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeInputLabel}>Min</Text>
              <TextInput
                style={styles.timeInput}
                value={formData.duration.minutes.toString()}
                onChangeText={(text) => updateTimeConfig('duration', 'minutes', text)}
                placeholder="30"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeInputLabel}>Sec</Text>
              <TextInput
                style={styles.timeInput}
                value={formData.duration.seconds.toString()}
                onChangeText={(text) => updateTimeConfig('duration', 'seconds', text)}
                placeholder="0"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>
        </View>

        <View style={styles.timingGroup}>
          <Text style={styles.timingLabel}>Start Delay</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeInputLabel}>Hours</Text>
              <TextInput
                style={styles.timeInput}
                value={formData.delay.hours.toString()}
                onChangeText={(text) => updateTimeConfig('delay', 'hours', text)}
                placeholder="0"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeInputLabel}>Min</Text>
              <TextInput
                style={styles.timeInput}
                value={formData.delay.minutes.toString()}
                onChangeText={(text) => updateTimeConfig('delay', 'minutes', text)}
                placeholder="0"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeInputGroup}>
              <Text style={styles.timeInputLabel}>Sec</Text>
              <TextInput
                style={styles.timeInput}
                value={formData.delay.seconds.toString()}
                onChangeText={(text) => updateTimeConfig('delay', 'seconds', text)}
                placeholder="0"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.label}>Experiment Description *</Text>
        <TextInput
          style={[styles.input, styles.description]}
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Describe the purpose, methodology, and expected outcomes of your experiment..."
          placeholderTextColor="#64748b"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text style={styles.helpText}>
          Provide a detailed description to help others understand your experiment
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Experiment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(30, 41, 59, 0.6)',
    padding: 20,
  },
  
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  formGrid: {
    gap: 16,
    marginBottom: 20,
  },
  
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#f1f5f9',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  
  timeSection: {
    backgroundColor: 'rgba(2, 6, 23, 0.4)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#f1f5f9',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  description: {
    height: 70,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});