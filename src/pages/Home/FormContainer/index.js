import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useList } from '../../../Contexts/ListContext';
import FormInput from './FormInput';
import {
  MainFormS,
  SectionFormS,
  FormShowButtonS,
  IconButtonS,
} from './styles';
import { Add, Trash } from '../../../assets/icons';

const validClass = 'form-control';
const invalidClass = 'form-control is-invalid';

export default function FormContainer({ handleToggleModal }) {
  // Getting information from "listState" Reducer;
  const { display, changeDisplay, addToDo } = useList();

  // Using disptach;
  const handleAddItem = (text) => addToDo(text);
  const handleDisplayTasks = (e) => changeDisplay(e);

  // Component state;
  const [taskText, setTaskText] = useState('');
  const [formInputClass, setInputClass] = useState(validClass);
  const [formFocus, setFormFocus] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setTaskText(value);
  };

  const handleToggleFocus = (bool = true) => {
    setFormFocus(bool);
  };

  const handleToggleFormClass = ({ target: { value } }) => {
    if (!value.trim()) {
      setInputClass(invalidClass);
    } else {
      setInputClass(validClass);
    }
  };

  const handleResetFormClass = () => {
    setInputClass(validClass);
  };

  const addTaskRule = () => {
    if (!taskText.trim()) {
      setInputClass(invalidClass);
    } else {
      handleAddItem(taskText);
      setTaskText('');
    }
    handleToggleFocus();
  };

  return (
    <MainFormS onSubmit={(e) => e.preventDefault()}>
      <SectionFormS>
        <FormInput
          taskText={taskText}
          formInputClass={formInputClass}
          formFocus={formFocus}
          handleChange={handleChange}
          handleToggleFormClass={handleToggleFormClass}
          handleToggleFocus={handleToggleFocus}
          handleResetFormClass={handleResetFormClass}
        />
        <IconButtonS add large onClick={addTaskRule}>
          <Add title="Adicionar tarefa" />
        </IconButtonS>
        <IconButtonS
          clear
          large
          onClick={() => {
            handleToggleModal('clear');
          }}
          data-testid="clear-btn"
        >
          <Trash title="Remover Tarefas" />
        </IconButtonS>
      </SectionFormS>
      <SectionFormS>
        <FormShowButtonS
          value="all"
          onClick={handleDisplayTasks}
          display={display}
        >
          Todas
        </FormShowButtonS>
        <FormShowButtonS
          value="toDo"
          onClick={handleDisplayTasks}
          display={display}
        >
          Pendentes
        </FormShowButtonS>
        <FormShowButtonS
          value="completed"
          onClick={handleDisplayTasks}
          display={display}
        >
          Concluídas
        </FormShowButtonS>
      </SectionFormS>
    </MainFormS>
  );
}

FormContainer.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
};
