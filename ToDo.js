import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export default function ToDo({ text, isCompleted, id, deleteToDo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);
  const [todo, setTodo] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity
          onPress={() => {
            setCompleted(!completed);
          }}
        >
          <View
            style={[
              styles.circle,
              completed ? styles.completedCircle : styles.uncompletedCircle
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={[
              styles.text,
              styles.input,
              completed ? styles.completedText : styles.uncompletedText
            ]}
            value={todo}
            multiline={true}
            onChangeText={text => setTodo(text)}
            returnKeyType={"done"}
            autoCorrect={false}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
        ) : (
          <Text
            style={[
              styles.text,
              completed ? styles.completedText : styles.uncompletedText
            ]}
          >
            {text}
          </Text>
        )}
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
          <TouchableOpacity
            onPress={() => {
              setIsEditing(true);
              setTodo(text);
            }}
          >
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✏️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteToDo(id)}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

ToDo.propTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

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
    width: width / 2
    // justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5
  }
});
