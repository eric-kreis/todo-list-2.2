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

  const [task, setTask] = useState('');
  const [formInputClass, setInputClass] = useState(validClass);
  const [formFocus, setFormFocus] = useState(false);

  const handleChange = ({ target: { value } }) => setTask(value);

  const handleToggleFocus = (bool = true) => setFormFocus(bool);

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
    if (!task.trim()) {
      setInputClass(invalidClass);
    } else {
      addToDo(task);
      setTask('');
    }
    handleToggleFocus();
  };

  return (
    <MainFormS onSubmit={(e) => e.preventDefault()}>
      <StatusSectionS isSaving={isSaving}>
        <img src={loader} alt="loading" />
        <Check className="check-icon" />
        <span>{ isSaving ? 'Salvando...' : 'Alterações salvas' }</span>
      </StatusSectionS>
      <SectionFormS>
        <FormInput
          task={task}
          formInputClass={formInputClass}
          formFocus={formFocus}
          handleChange={handleChange}
          handleToggleFormClass={handleToggleFormClass}
          handleToggleFocus={handleToggleFocus}
          handleResetFormClass={handleResetFormClass}
        />
        <IconButtonS type="submit" add large onClick={addTaskRule}>
          <Add title="Adicionar tarefa" />
        </IconButtonS>
        <IconButtonS clear large onClick={() => handleToggleModal('clear')}>
          <Trash title="Remover Tarefas" />
        </IconButtonS>
      </SectionFormS>
      <SectionFormS>
        <FormShowButtonS value="all" onClick={changeDisplay} display={display}>
          Todas
        </FormShowButtonS>
        <FormShowButtonS value="toDo" onClick={changeDisplay} display={display}>
          Pendentes
        </FormShowButtonS>
        <FormShowButtonS value="completed" onClick={changeDisplay} display={display}>
          Concluídas
        </FormShowButtonS>
      </SectionFormS>
    </MainFormS>
  );
}

FormContainer.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
};
