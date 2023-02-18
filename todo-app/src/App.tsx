import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { Route } from './enums';
import { Home } from './pages/Home';
import { Edit } from './pages/Edit';
import { Todo } from './types/index';
import { fetchTodos } from './service/todo-service';
import { Add } from './pages/Add';

function App() {

  const [route, setRoute] = useState<Route>(Route.HOME);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState<number>(0);

  useEffect(() => {
    if (todos.length === 0) {
        setTodos(fetchTodos());
    }
  }, [todos.length]);

  const changeRoute = useCallback((newRoute: Route) => setRoute(newRoute), []);

  const onHandleCheck = useCallback((index: number) => {
    const copy = [...todos];
    copy[index].completed = !copy[index].completed;
    setTodos(copy);
  }, [todos]);

  const onEdit = useCallback((index: number) => {
    setCurrentlyEditing(index);
    setRoute(Route.EDIT);
  }, []);

  const onEditSave = useCallback((description: string) => {
    const copy = [...todos];
    copy[currentlyEditing].description = description;
    setTodos(copy);
    setRoute(Route.HOME);
  }, [todos, currentlyEditing]);

  const handleDelete = useCallback((id: number) => {
    const copy = [...todos];
    setTodos(copy.filter((t) => t.id !== id));
    setRoute(Route.HOME);
  }, [todos]);

  const handleAdd = useCallback((description: string) => {
    const copy = [...todos];
    copy.push({id: Math.floor(Math.random() * 101), description, completed: false});
    setTodos(copy);
    setRoute(Route.HOME);
  }, [todos]);

  const renderContent = () => {
    switch (route) {
      case Route.HOME: return <Home todos={todos} onHandleCheck={onHandleCheck} onEdit={onEdit} onChangeRoute={changeRoute} />
      case Route.EDIT: return <Edit todo={todos[currentlyEditing]} onSave={onEditSave} onDelete={handleDelete} />
      case Route.ADD: return <Add onAdd={handleAdd} onCancel={() => setRoute(Route.HOME)} />
      default: return <></>;
    }
  };

  return (
    <>
     <NavigationBar />
     {renderContent()}
    </>
  );
}

export default App;
