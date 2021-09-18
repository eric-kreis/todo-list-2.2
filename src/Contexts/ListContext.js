import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { database } from '../firebase';
import { useAuth } from './AuthContext';
import { getDoc, setDoc } from '../helpers/database';
import collections from '../utils/collections';

const ListContext = createContext();

export const useList = () => useContext(ListContext);

export default function ListProvider({ children }) {
  const { userData } = collections;
  const { currentUser } = useAuth();

  const [display, setDisplay] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const resetState = () => {
    setDisplay('all');
    setTasks([]);
    setCheckedItems([]);
    setLoading(true);
  };

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const doc = await getDoc({
          collName: userData,
          docName: currentUser.uid,
        });

        if (doc.exists) {
          const savedData = doc.data();
          setTasks(savedData.tasks || []);
          setCheckedItems(savedData.checkedItems || []);
        } else {
          setTasks([]);
          setCheckedItems([]);
        }
        setLoading(false);
      } else {
        resetState();
      }
    })();
  }, [currentUser, userData]);

  useEffect(() => {
    // DataBase saver;
    if (currentUser && !loading) {
      setDoc({
        collName: userData,
        docName: currentUser.uid,
        data: {
          tasks,
          checkedItems,
          lastModification: database.getCurrentTimestamp(),
        },
      });
    }
  }, [checkedItems, currentUser, loading, tasks, userData]);

  const changeDisplay = ({ target: { value } }) => {
    setDisplay(value);
  };

  const addToDo = (text) => {
    setTasks((prevTasks) => (
      [...prevTasks, { id: v4(), text }]
    ));
  };

  const removeToDo = (id) => {
    setTasks((prevTasks) => (
      prevTasks.filter(({ id: taskId }) => taskId !== id)
    ));
    setCheckedItems((prevChecks) => (
      prevChecks.filter((checkedId) => checkedId !== id)
    ));
  };

  const toggleCheck = ({ target: { value, checked } }) => {
    if (checked) {
      setCheckedItems((prevChecks) => (
        [...prevChecks, value]
      ));
    } else {
      setCheckedItems((prevChecks) => (
        prevChecks.filter((id) => id !== value)
      ));
    }
  };

  const editTask = (taskText, taskId) => {
    if (taskText.trim()) {
      setTasks((prevTasks) => (
        prevTasks.map(({ id, text }) => {
          if (id === taskId) return { id, text: taskText };
          return { id, text };
        })
      ));
    }
  };

  const clearToDo = () => {
    setTasks((prevTasks) => (
      prevTasks.filter(({ id }) => checkedItems.includes(id))
    ));
  };

  const clearDone = () => {
    setTasks((prevTasks) => (
      prevTasks.filter(({ id }) => !checkedItems.includes(id))
    ));
    setCheckedItems([]);
  };

  const clearAll = () => {
    setCheckedItems([]);
    setTasks([]);
  };

  const contextValue = {
    display,
    tasks,
    checkedItems,
    loading,
    changeDisplay,
    addToDo,
    removeToDo,
    toggleCheck,
    editTask,
    clearToDo,
    clearDone,
    clearAll,
  };

  return (
    <ListContext.Provider value={contextValue}>
      { children }
    </ListContext.Provider>
  );
}

ListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
