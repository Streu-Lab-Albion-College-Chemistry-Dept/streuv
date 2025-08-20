import React, { useState } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

interface MenuBarProps {
  onMenuAction?: (action: string) => void;
}

interface MenuItem {
  label: string;
  shortcut?: string;
  action: string;
  divider?: boolean;
  disabled?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function HeaderMenuBar({ onMenuAction }: MenuBarProps): React.JSX.Element {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [dropdownAnimation] = useState(new Animated.Value(0));

  const menuSections: MenuSection[] = [
    {
      title: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N', action: 'file.new' },
        { label: 'Open', shortcut: 'Ctrl+O', action: 'file.open' },
        { label: 'Open Recent', action: 'file.openRecent' },
        { label: '', action: '', divider: true },
        { label: 'Save', shortcut: 'Ctrl+S', action: 'file.save' },
        { label: 'Save As', shortcut: 'Ctrl+Shift+S', action: 'file.saveAs' },
        { label: 'Save All', shortcut: 'Ctrl+Alt+S', action: 'file.saveAll' },
        { label: '', action: '', divider: true },
        { label: 'Export', action: 'file.export' },
        { label: 'Print', shortcut: 'Ctrl+P', action: 'file.print' },
        { label: '', action: '', divider: true },
        { label: 'Exit', shortcut: 'Alt+F4', action: 'file.exit' },
      ]
    },
    {
      title: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', action: 'edit.undo' },
        { label: 'Redo', shortcut: 'Ctrl+Y', action: 'edit.redo' },
        { label: '', action: '', divider: true },
        { label: 'Cut', shortcut: 'Ctrl+X', action: 'edit.cut' },
        { label: 'Copy', shortcut: 'Ctrl+C', action: 'edit.copy' },
        { label: 'Paste', shortcut: 'Ctrl+V', action: 'edit.paste' },
        { label: '', action: '', divider: true },
        { label: 'Select All', shortcut: 'Ctrl+A', action: 'edit.selectAll' },
        { label: 'Find', shortcut: 'Ctrl+F', action: 'edit.find' },
        { label: 'Replace', shortcut: 'Ctrl+H', action: 'edit.replace' },
      ]
    },
    {
      title: 'View',
      items: [
        { label: 'Zoom In', shortcut: 'Ctrl++', action: 'view.zoomIn' },
        { label: 'Zoom Out', shortcut: 'Ctrl+-', action: 'view.zoomOut' },
        { label: 'Reset Zoom', shortcut: 'Ctrl+0', action: 'view.resetZoom' },
        { label: '', action: '', divider: true },
        { label: 'Full Screen', shortcut: 'F11', action: 'view.fullscreen' },
        { label: 'Developer Tools', shortcut: 'F12', action: 'view.devtools' },
      ]
    }
  ];

  const handleMenuPress = (menuTitle: string) => {
    if (activeMenu === menuTitle) {
      closeMenu();
    } else {
      setActiveMenu(menuTitle);
      animateDropdown(true);
    }
  };

  const handleMenuItemPress = (action: string) => {
    onMenuAction?.(action);
    closeMenu();
  };

  const closeMenu = () => {
    animateDropdown(false);
    setTimeout(() => setActiveMenu(null), 150);
  };

  const animateDropdown = (show: boolean) => {
    Animated.timing(dropdownAnimation, {
      toValue: show ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const renderDropdown = (section: MenuSection) => {
    if (activeMenu !== section.title) return null;

    return (
      <Animated.View 
        style={[
          styles.dropdown,
          {
            opacity: dropdownAnimation,
            transform: [{
              translateY: dropdownAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 0],
              })
            }]
          }
        ]}
      >
        {section.items.map((item, index) => {
          if (item.divider) {
            return <View key={index} style={styles.divider} />;
          }

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                item.disabled && styles.menuItemDisabled
              ]}
              onPress={() => handleMenuItemPress(item.action)}
              disabled={item.disabled}
            >
              <Text style={[
                styles.menuItemText,
                item.disabled && styles.menuItemTextDisabled
              ]}>
                {item.label}
              </Text>
              {item.shortcut && (
                <Text style={styles.shortcutText}>
                  {item.shortcut}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        {menuSections.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <TouchableOpacity
              style={[
                styles.menuButton,
                activeMenu === section.title && styles.menuButtonActive
              ]}
              onPress={() => handleMenuPress(section.title)}
            >
              <Text style={[
                styles.menuButtonText,
                activeMenu === section.title && styles.menuButtonTextActive
              ]}>
                {section.title}
              </Text>
            </TouchableOpacity>
            {renderDropdown(section)}
          </View>
        ))}
      </View>
      
      {/* Overlay to close menu when clicking outside */}
      {activeMenu && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={closeMenu}
          activeOpacity={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  
  menuBar: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingHorizontal: 8,
    height: 32,
    alignItems: 'center',
  },
  
  menuSection: {
    position: 'relative',
  },
  
  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 2,
  },
  
  menuButtonActive: {
    backgroundColor: '#007acc',
  },
  
  menuButtonText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '400',
  },
  
  menuButtonTextActive: {
    color: '#ffffff',
  },
  
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 200,
    paddingVertical: 4,
    zIndex: 1001,
  },
  
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 28,
  },
  
  menuItemDisabled: {
    opacity: 0.5,
  },
  
  menuItemText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '400',
  },
  
  menuItemTextDisabled: {
    color: '#9ca3af',
  },
  
  shortcutText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '400',
    marginLeft: 24,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  
  overlay: {
    position: 'absolute',
    top: 32,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
});
