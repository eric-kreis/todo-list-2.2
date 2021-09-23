import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useList } from '../../../Contexts/ListContext';
import FormInput from './FormInput';
import {
  MainFormS,
  SectionFormS,
  FormShowButtonS,
  IconButtonS,
  StatusSectionS,
} from './styles';

import { invalidClass, validClass } from '../../../utils/inputClasses';

import { Add, Check, Trash } from '../../../assets/icons';
import loader from '../../../assets/loading.gif';

export default function FormContainer({ handleToggleModal }) {
  const {
    display,
    changeDisplay,
    addToDo,
    isSaving,
  } = useList();

  const handleAddItem = (text) => addToDo(text);
  const handleDisplayTasks = (e) => changeDisplay(e);

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
      <StatusSectionS isSaving={isSaving}>
        <img src={loader} alt="loading" />
        <Check className="check-icon" />
        <span>
          { isSaving ? 'Salvando...' : 'Alterações salvas' }
        </span>
      </StatusSectionS>
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
