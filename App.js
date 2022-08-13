import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

export default function App() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState([]);

  const onPressItemDelete = (key) => {
    const newTodos = todos.filter((item) => item.key !== key)
    setTodos(newTodos)
  }

  const onChangeText = (value) => {
    setText(value)
  }

  const onPressButton = () => {
    const newTodos = [...todos, {
      name: text, key: Math.random().toString(),
    }]
    setText("")
    setTodos(newTodos)
  }

  const renderItem = ({item}) => {
    return (
      <View style={ styles.item }>
        <Text style={ styles.itemName }>{ item.name }</Text>
        <TouchableOpacity
          onPress={() => onPressItemDelete(item.key)}
          style={ styles.deleteView }
        >
          <Text style={ styles.deleteText } >Done or Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={ styles.title }>TODO</Text>
      { todos.length === 0 &&
        <View>
          <TextInput
            value={text}
            onChangeText={onChangeText}
            style={styles.textInput}
          />
          <Button
            title="submit"
            color="blue"
            onPress={onPressButton}
          />
        </View>
      }
      <FlatList
        data={todos}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 300,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  item: {
    width: 300,
    marginBottom: 30,
    alignItems: 'center',
    padding: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteView: {
    width: 50,
    backgroundColor: 'gray',
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
  },
});
