import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header.js';
import TodoItem from './components/todoItem.js';
import AddTodo from './components/addTodo.js';

export default function App() {

  const [todos, setTodos] = useState([
    { text: 'Welcome to Faster EasyToDo', key: '1' },
    { text: 'Type into add a new item', key: '2' },
    { text: 'Touch your todo to remove it from list(later completed list)', key: '3' }
  ])

  const pressHandler = (key) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.key != key))
  }

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos(prevTodos => [{ text: text, key: Math.random().toString() }, ...prevTodos])
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
