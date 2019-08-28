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
      setTodos({ ...toDos, ...newTodoObject });
      setTodo("");
    }
  };

  const deleteDoDo = id => {
    delete toDos[id];
    setTodos({ ...toDos });
  };

  const uncompleteToDo = id => {
    setTodos({ ...toDos, [id]: { ...toDos[id], isCompleted: false } });
  };

  const completeTodo = id => {
    setTodos({ ...toDos, [id]: { ...toDos[id], isCompleted: true } });
  };

  const updateTodo = (id, text) => {
    setTodos({ ...toDos, [id]: { ...toDos[id], text: text } });
  };

  if (!loadedTodos) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Awesome Todo</Text>
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
        <ScrollView contentContainerStyle={styles.toDos}>
          {/* <ToDo text="hello" /> */}
          {Object.values(toDos)
            .sort((a, b) => {
              dateA = a.createdAt;
              dateB = b.createdAt;
              return dateB - dateA;
            })
            .map(toDo => {
              // console.log("id: " + toDo.id + " text: " + toDo.text);
              return (
                <ToDo
                  key={toDo.id}
                  deleteToDo={deleteDoDo}
                  uncompleteToDo={uncompleteToDo}
                  completeTodo={completeTodo}
                  updateTodo={updateTodo}
                  {...toDo}
                />
              );
            })}
        </ScrollView>
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
