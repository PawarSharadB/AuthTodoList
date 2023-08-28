import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Components
import Button from '../components/Button';
import Input from '../components/TextInput';
// Constants
import { COLORS } from '../constants/colors';

const HomeScreen = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleBackPress = () => {
    BackHandler.exitApp();
  };

  const addOrUpdateTodo = () => {
    if (editIndex !== null) {
      const updatedTodoList = [...todoList];
      updatedTodoList[editIndex] = inputText;
      setTodoList(updatedTodoList);
      setInputText('');
      setEditIndex(null);
    } else {
      if (inputText.trim() !== '') {
        setTodoList([...todoList, inputText]);
        setInputText('');
      }
    }
  };

  const removeTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  const editTodo = (index) => {
    setInputText(todoList[index]);
    setEditIndex(index);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <Input
        placeholder='Enter a new todo...'
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button
        title={editIndex !== null ? 'Update Todo' : 'Add Todo'}
        onPress={addOrUpdateTodo}
        color={COLORS.primary}
        disabled={inputText.trim() === ''}
      />
      <FlatList
        data={todoList}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.iconContainer}>
              <Ionicons
                onPress={() => editTodo(index)}
                name='md-create'
                size={24}
                color={COLORS.primary}
                style={styles.icon}
              />
              <Ionicons
                onPress={() => removeTodo(index)}
                name='md-trash'
                size={24}
                color={COLORS.secondary}
                style={styles.icon}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.grey,
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  todoText: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default HomeScreen;
