import React, { useEffect, useState } from "react";
import { Button, TextInput, FlatList, Text } from "react-native-paper";
import { useAuth } from "../context/AuthProvider";

const HomeScreen = () => {
  const { session, supabase } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase.from("todos").select("*");
    if (error) console.log("error", error);
    else setTodos(todos);
  };

  const addTodo = async () => {
    if (!session || !session.user) {
      // handle unauthenticated scenario
      return;
    }
    console.log(session.user.id);
    const { data: todo, error } = await supabase
      .from("todos")
      .insert({ title: newTodo, completed: false, user_id: session.user.id }, { returning: 'minimal' });
    if (error) console.log("error", error);
    else setTodos([...todos, todo]);
  };

  return (
    <>
      <TextInput label="New Todo" value={newTodo} onChangeText={setNewTodo} />
      <Button onPress={addTodo}>Add Todo</Button>
      {/* <FlatList
        data={todos}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      /> */}
    </>
  );
};

export default HomeScreen;
