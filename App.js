import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

// Todo Description
// 12314123123 = {
//   id: 12314123123,
//   text: 'test text',
//   isCompleted: false,
//   date:123141231231
// }

export default function App() {
  const [todo, setTodo] = useState("");
  const [loadedTodos, setLoadedTodos] = useState(false);
  const [toDos, setTodos] = useState({});

  useEffect(() => {
    setLoadedTodos(true);
  }, []);

  const addToDo = () => {
    if (todo !== "") {
      const ID = uuidv1();
      const newTodoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: todo,
          createdAt: Date.now()
        }
      };
      console.log(newTodoObject);

      setTodos(todo);

      console.log(toDos);

      setTodo();
    }
  };

  if (!loadedTodos) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Awsome Todo</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={"New To Do"}
          value={todo}
          onChangeText={text => setTodo(text)}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={addToDo}
        />
        <ScrollView contentContainerStyle={styles.toDos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
