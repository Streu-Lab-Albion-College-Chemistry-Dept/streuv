
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
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropdownText}>{value || 'Select...'}</Text>
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
              <Text style={styles.dropdownOptionText}>{option}</Text>
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
      : Alert.alert('Error', 'Slot already takenj')
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
    <View style={styles.formContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.formTitle}>Create Experiment Session</Text>
        
        {/* Creator */}
        <Text style={styles.label}>Creator *</Text>
        <TextInput
          style={styles.input}
          value={formData.creator}
          onChangeText={(text) => setFormData(prev => ({ ...prev, creator: text }))}
          placeholder="Enter creator name"
          placeholderTextColor="#9ca3af"
        />

        {/* Role */}
        <Dropdown
          label="Role *"
          value={formData.role}
          options={roleOptions}
          onSelect={(value) => setFormData(prev => ({ ...prev, role: value as Role }))}
        />

        {/* Email */}
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          placeholder="Enter email address"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
        />

        {/* Slot */}
        <Dropdown
          label="Relay Slot *"
          value={formData.slot}
          options={slotOptions}
          onSelect={(value) => setFormData(prev => ({ ...prev, slot: value as RelaySlot }))}
        />

        {/* Duration */}
        <Text style={styles.sectionTitle}>Duration</Text>
        <View style={styles.timeRow}>
          {['hours','minutes','seconds'].map((f) => (
            <View style={styles.timeInput} key={f}>
              <Text style={styles.timeLabel}>{f}</Text>
              <TextInput
                style={styles.input}
                value={formData.duration[f as keyof TimeConfig].toString()}
                onChangeText={(text) => updateTimeConfig('duration', f as keyof TimeConfig, text)}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          ))}
        </View>

        {/* Delay */}
        <Text style={styles.sectionTitle}>Delay</Text>
        <View style={styles.timeRow}>
          {['hours','minutes','seconds'].map((f) => (
            <View style={styles.timeInput} key={f}>
              <Text style={styles.timeLabel}>{f}</Text>
              <TextInput
                style={styles.input}
                value={formData.delay[f as keyof TimeConfig].toString()}
                onChangeText={(text) => updateTimeConfig('delay', f as keyof TimeConfig, text)}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          ))}
        </View>

        {/* Cycles */}
        <Text style={styles.label}>Cycles</Text>
        <TextInput
          style={styles.input}
          value={formData.cycles.toString()}
          onChangeText={(text) => setFormData(prev => ({ ...prev, cycles: parseInt(text) || 1 }))}
          keyboardType="numeric"
          placeholder="1"
        />

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#9ca3af"
        />

        {/* Description */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Enter experiment description"
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={3}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    width: 400,
    maxHeight: 500,
  },
  
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    marginBottom: 8,
  },
  
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },

  timeLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#374151',
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },

  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },

  timeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },

  timeInput: {
    flex: 1,
  },

  dropdownContainer: {
    marginBottom: 12,
  },

  dropdownButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownText: {
    fontSize: 13,
    color: '#374151',
  },

  dropdownArrow: {
    fontSize: 10,
    color: '#6b7280',
  },

  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    marginTop: 2,
    maxHeight: 120,
  },

  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  dropdownOptionText: {
    fontSize: 13,
    color: '#374151',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  
  submitButton: {
    backgroundColor: '#3b82f6',
  },
  
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  
  submitButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
  },

});

