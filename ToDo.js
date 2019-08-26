import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { height, width } = Dimensions.get("window");

export default function ToDo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity
          onPress={() => {
            setIsCompleted(!isCompleted);
          }}
        >
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
          ]}
        >
          hello~ Welcom!~
        </Text>
      </View>
      {isEditing ? (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✅</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✏️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#f23657"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  }
});