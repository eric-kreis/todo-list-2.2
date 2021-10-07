import styled from 'styled-components';

const UserContainerS = styled.div`
  align-items: center;
  border-radius: 3px;
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto 20px;
  width: 100%;
`;

export const PhotoContainerS = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  height: 120px;
  overflow: hidden;
  width: 120px;

  img {
    height: 100%;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ButtonContainerS = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 125px;

  input {
    opacity: 0;
    position: absolute;
    left: -99999px;
  }
`;

export const UserButtonS = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.input};
  display: flex;
  justify-content: center;

  * {
    font-size: 30px;
  }

  :hover {
    color: ${({ theme, gallery, deleteBtn }) => {
    if (gallery) {
      return '#3DA4ED';
    }
    if (deleteBtn) {
      return '#BD282C';
    }
    return theme.colors.primary;
  }}
  }
`;

export const FileLabelS = styled.label`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.input};
  display: flex;
  justify-content: center;

  * {
    font-size: 30px;
  }

  :hover {
    cursor: pointer;
    color: #F7B400;
  }
`;

export default UserContainerS;
