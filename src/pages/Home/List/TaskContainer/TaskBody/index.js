import React from 'react';
import PropTypes from 'prop-types';

import { useList } from '../../../../../Contexts/ListContext';
import TaskSection from './TaskSection';
import { TaskBodyS, TaskButtonS, TaskIconS } from './styles';
import { Edit, Remove } from '../../../../../assets/icons';

export default function TaskBody({ id, text, handleToggleEdit }) {
  const { removeToDo } = useList();
  const handleRemoveItem = () => removeToDo(id);

  return (
    <TaskBodyS>
      <TaskSection id={id}>
        { text }
      </TaskSection>
      <TaskButtonS>
        <TaskIconS onClick={handleToggleEdit} type="button">
          <Edit title="Editar tarefa" />
        </TaskIconS>
        <TaskIconS clear onClick={handleRemoveItem} type="button">
          <Remove title="Remover tarefa" />
        </TaskIconS>
      </TaskButtonS>
    </TaskBodyS>
  );
}

TaskBody.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleToggleEdit: PropTypes.func.isRequired,
};
