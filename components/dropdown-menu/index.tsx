// MenuTrigger Component
import React from "react";
import { TouchableOpacity } from "react-native";

export const MenuTrigger = ({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) => {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

// MenuOption Component
import { Text, StyleSheet } from "react-native";

export const MenuOption = ({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={menuOptionStyles.menuOption}>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  );
};
const menuOptionStyles = StyleSheet.create({
  menuOption: {
    padding: 10,
  },
});

// DropdownMenu Component
import { useRef, useEffect, useState, ReactNode } from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";

interface DropdownMenuProps {
  visible: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  trigger: ReactNode;
  children: ReactNode;
  dropdownWidth?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  dropdownWidth = 200,
}) => {
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height - 20,
          width: width - 190,
        });
      });
    }
  }, [visible]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={dropdownStyles.modalOverlay}>
              <View
                style={[
                  dropdownStyles.menu,
                  {
                    top: position.y,
                    left: position.x + position.width / 2 - dropdownWidth / 2,
                    width: dropdownWidth,
                  },
                ]}
              >
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const dropdownStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default DropdownMenu;
