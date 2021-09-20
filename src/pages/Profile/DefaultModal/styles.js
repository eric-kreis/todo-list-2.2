import { shade } from 'polished';
import styled from 'styled-components';

const ModalSectionS = styled.section`
  background-color: ${({ theme }) => theme.modal.modalBackground};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.text};
  margin: auto;
  text-align: center;
  padding: 32px;
  width: 25%;

  @media(max-width: 1024px) {
    width: 35%;
  }

  @media(max-width: 768px) {
    width: 45%;
  }

  @media(max-width: 640px) {
    width: 75%;
  }
`;

export const PhotoSectionS = styled.section`
  background-color: ${({ theme }) => shade(0.08, theme.colors.primary)};
  border-radius: 50%;
  justify-content: center;
  height: 125px;
  margin: 0 auto 32px;
  overflow: hidden;
  width: 125px;

  img {
    height: 100%;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ButtonContainerS = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 70%;

  button {
    background-color: ${({ theme }) => theme.colors.text};
    border: 0;
    border-radius: 2px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    width: 100%;

    :first-of-type {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 8px;
    }
  }
`;

export default ModalSectionS;
