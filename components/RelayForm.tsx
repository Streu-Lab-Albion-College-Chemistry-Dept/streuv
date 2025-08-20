
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
  SessionTimeout, 
  ExperimentSession 
} from '../shared/types';
import { useExperimentStore } from '../ctx/stores/ExperimentStore';

interface RelayFormProps {
  onSubmit?: (session: ExperimentSession) => void;
  onCancel?: () => void;
}

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onSelect, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={styles.dropdownBtn}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.menu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function RelayForm({ onCancel }: RelayFormProps) {
  const { setSession } = useExperimentStore()
  const [formData, setFormData] = useState({
    creator: '',
    role: '' as Role,
    email: '',
    slot: '' as RelaySlot,
    duration: { hours: 0, minutes: 0, seconds: 0 },
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

  const createTimeout = (timeoutMs: number): SessionTimeout => {
    let timerId: ReturnType<typeof setTimeout>;
    let expired = false;
    
    const cancel = () => {
      if (timerId) clearTimeout(timerId);
      expired = true;
    };

    timerId = setTimeout(() => {
      expired = true;
    }, timeoutMs);

    return { timeoutMs, timerId, cancel, expired };
  };

  const handleSubmit = () => {
    if (!formData.creator.trim() || !formData.role || !formData.email.trim() || 
        !formData.slot || !formData.description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const experimentSession: ExperimentSession = {
      ...formData,
      timeout: createTimeout(30000),
    };
    
    
    return 'Ok' in setSession(experimentSession) 
      ? setFormData({
          creator: '',
          role: '' as Role,
          email: '',
          slot: '' as RelaySlot,
          duration: { hours: 0, minutes: 0, seconds: 0 },
          delay: { hours: 0, minutes: 0, seconds: 0 },
          cycles: 1,
          date: new Date().toISOString().split('T')[0],
          description: '',
        })
      : Alert.alert('Error', 'Slot already taken')
  };

  const updateTimeConfig = (type: 'duration' | 'delay', field: keyof TimeConfig, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: numValue,
      }
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Experiment</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={formData.creator}
          onChangeText={(text) => setFormData(prev => ({ ...prev, creator: text }))}
          placeholder="Creator name"
          placeholderTextColor="#9ca3af"
        />

        <Dropdown
          label=""
          value={formData.role}
          options={roleOptions}
          onSelect={(value) => setFormData(prev => ({ ...prev, role: value as Role }))}
          placeholder="Select role"
        />

        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Dropdown
          label=""
          value={formData.slot}
          options={slotOptions}
          onSelect={(value) => setFormData(prev => ({ ...prev, slot: value as RelaySlot }))}
          placeholder="Select slot"
        />

        <View style={styles.timeSection}>
          <Text style={styles.timeTitle}>Duration</Text>
          <View style={styles.timeRow}>
            <TextInput
              style={styles.timeInput}
              value={formData.duration.hours.toString()}
              onChangeText={(text) => updateTimeConfig('duration', 'hours', text)}
              placeholder="0h"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={styles.timeInput}
              value={formData.duration.minutes.toString()}
              onChangeText={(text) => updateTimeConfig('duration', 'minutes', text)}
              placeholder="30m"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>

        <TextInput
          style={[styles.input, styles.description]}
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Description"
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    width: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  
  form: {
    gap: 16,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
  
  timeSection: {
    marginVertical: 8,
  },
  
  timeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
  },
  
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  
  dropdown: {
    position: 'relative',
    zIndex: 1000,
  },
  
  dropdownBtn: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  
  placeholder: {
    color: '#9ca3af',
  },
  
  arrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  
  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  
  createBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  
  createText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});

