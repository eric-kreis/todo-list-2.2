import styled from 'styled-components';

const TaskLabelS = styled.label`
  align-items: center;
  display: flex;
  text-decoration: ${(({ checkedItems, id }) => (
    (checkedItems.includes(id))
      ? 'line-through'
      : 'none'
  ))};
  max-width: 90%;
  overflow: hidden;
  padding: 8px 0;
  padding-right: 16px;
  width: 100%;

  input {
    margin-right: 28px;
    min-width: 13px;

    :hover {
      cursor: pointer;
    }
  }

  span {
    overflow-x: hidden;
  }

  @media(max-width: 560px) {
    font-size: 14px;
  }
`;

export default TaskLabelS;
