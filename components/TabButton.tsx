import React, { useState } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

interface TabButtonProps {
  title: string;
  action?: () => void;
}

export default function TabButton({ 
  title, 
  action = () => console.log('pressed')
}: TabButtonProps): React.JSX.Element {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={action}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.container,
        isPressed && styles.containerPressed,
      ]}
    >
      <Text style={[
        styles.text,
        isPressed && styles.textPressed,
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 24,
    borderWidth: 2,
    minWidth: 80,
    borderColor: '#fed7aa',
    backgroundColor: '#fef3e2',
  },
  
  containerPressed: {
    borderColor: '#fb923c',
    backgroundColor: '#fed7aa',
  },
  
  text: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#ea580c',
  },
  
  textPressed: {
    color: '#c2410c',
  },
});
