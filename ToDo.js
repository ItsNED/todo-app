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

export default function ToDo({
  text,
  isCompleted,
  id,
  deleteToDo,
  uncompleteToDo,
  completeTodo
}) {
  const [isEditing, setIsEditing] = useState(false);
  // const [completed, setCompleted] = useState(isCompleted);
  const [todo, setTodo] = useState("");

  console.log(text, isCompleted, id);
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity
          onPress={() => {
            console.log("toggleComplete");
            // TODO: ToDo 가 2개 이상일 때 순서가 바뀌는 문제 수정
            if (isCompleted) {
              uncompleteToDo(id);
            } else {
              completeTodo(id);
            }
          }}
        >
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={[
              styles.text,
              styles.input,
              isCompleted ? styles.completedText : styles.uncompletedText
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
              isCompleted ? styles.completedText : styles.uncompletedText
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
  id: PropTypes.string.isRequired,
  uncompleteToDo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
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
