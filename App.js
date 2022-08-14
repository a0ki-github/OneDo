import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [text, setText] = useState("")
  const [todo, setTodo] = useState("")

  AsyncStorage.getItem('TODO')
    .then((value) => {
      setTodo(value)
    })

  console.log(todo)
  const onPressItemDelete = () => {
    setTodo("")
    AsyncStorage.clear()
  }

  const onChangeText = (value) => {
    setText(value)
  }

  const onPressButton = () => {
    AsyncStorage.clear()
    AsyncStorage.setItem('TODO', text)
    setTodo(text)
    setText("")
  }

  return (
    <View style={styles.container}>
      <Text style={ styles.title }>TODO</Text>
      { todo ?
        <View style={ styles.item }>
          <Text style={ styles.itemName }>{ todo }</Text>
          <TouchableOpacity
            onPress={onPressItemDelete}
            style={ styles.deleteView }
          >
            <Text style={ styles.deleteText } >完了 or 削除</Text>
          </TouchableOpacity>
        </View>
        :
        <View>
          <TextInput
            value={text}
            onChangeText={onChangeText}
            style={styles.textInput}
          />
          <Button
            title="作成"
            color="blue"
            onPress={onPressButton}
          />
        </View>
      }
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
    backgroundColor: 'gray',
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
});
