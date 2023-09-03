import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button, RadioButton, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SortDialog = ({ visible, onDismiss, onSelectSortOption, language }) => {
  const [checked, setChecked] = useState("asc");
  const [prevChecked, setPrevChecked] = useState(checked);

  const displayName = {
    en: {
      sortBy: "Sort by Name:",
      apply: "Apply",
      cancel: "Cancel",
      sort: "Sort",
      AtoZ: "Ascending",
      ZtoA: "Descending",
    },
    fr: {
      sortBy: "Trier par nom:",
      apply: "Appliquer",
      cancel: "Annuler",
      sort: "Trier",
      AtoZ: "Croissant",
      ZtoA: "Décroissant",
    },
  };

  const handleDoneButton = () => {
    setPrevChecked(checked);
    onSelectSortOption(checked);
    onDismiss();
  };

  const handleCancelButton = () => {
    setChecked(prevChecked);
    onDismiss();
  };

  const handleRadioChange = (checked) => {
    setChecked(checked);
  };

  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="fade"
      transparent
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.dialogContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={styles.title}>{displayName[language].sortBy}</Text>
          <RadioButton.Group onValueChange={handleRadioChange} value={checked}>
            <View style={styles.radioContainer}>
              <MaterialCommunityIcons
                name="sort-alphabetical-ascending"
                size={24}
                // color="#000"
                color={theme.colors.primary}
                style={styles.radioButtonIcon}
              />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].AtoZ}
                  value="asc"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>

            <View style={styles.radioContainer}>
              <MaterialCommunityIcons
                name="sort-alphabetical-descending"
                size={24}
                // color="#000"
                color={theme.colors.primary}
                style={styles.radioButtonIcon}
              />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].ZtoA}
                  value="desc"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.buttonContainer}>
            <Button onPress={handleCancelButton}>
              {displayName[language].cancel}
            </Button>
            <Button onPress={handleDoneButton}>
              {displayName[language].apply}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 25,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 8,
    marginTop: 8,
  },
  content: {
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the end
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  radioButtonIcon: {
    marginRight: 8,
  },
  radioButtonItem: {
    flex: 1,
  },
  radioButtonLabelContainer: {
    flex: 1,
    marginLeft: 8, // Adjust the margin as needed
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(SortDialog);
