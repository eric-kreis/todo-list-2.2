/* eslint-disable no-magic-numbers */
import { shade } from 'polished';
import styled from 'styled-components';

export const AuthBodyS = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  min-height: calc(var(--vh, 1vh) * 100);
`;

export const AuthContainerS = styled.section`
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: ${({ theme }) => theme.colors.input};
  display: grid;
  grid-template-rows: 4fr 6fr;
  height: ${({ defaultH }) => (defaultH ? '' : '85vh')};
  margin: auto;
  overflow-y: scroll;
  padding: ${({ update }) => (update ? '48px' : '10px')} 16px ${({ update }) => (update ? '24px' : 0)};
  text-align: center;
  width: 30%;

  ::-webkit-scrollbar {
    display: none;
  }

  @media(max-width: 1024px) {
    width: 50%;
  }

  @media(max-width: 768px) {
    width: 60%;
  }

  @media(max-width: 640px) {
    border-radius: 0;
    box-shadow: none;
    height: 0;
    min-height: calc(var(--vh, 1vh) * 100);
    width: 100%;
  }
`;

export const AuthFormS = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: ${({ signup }) => (signup ? 'flex-end' : 'space-around')};
  margin-top: ${({ signup }) => !signup && '30px'};

  .error {
    color: red;
    font-size: small;
    margin-bottom: 4px;
    padding: 0;
    padding-left: 4px;
    text-align: left;
  }

  .success {
    color: green;
    font-size: small;
    margin-bottom: 4px;
    padding: 0;
    padding-left: 4px;
    text-align: left;
  }

  .form-floating {
    background-color: ${({ theme }) => theme.modal.modalBackground};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.input};
    margin-bottom: 8px;
  }

  .form-control {
    background-color: whitesmoke;
  }

  .form-control:focus {
    color: #212529;
    outline: 0;

    &:-webkit-autofill:first-line {
      font-size: 1rem;
    }
  }
`;

export const SubmitButtonS = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 32px;
  padding: 8px 0;
  width: 100%;

  :disabled {
    opacity: 0.8;
  }

  :hover {
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
  }
`;

export const LinkContainerS = styled.section`
  padding: ${({ signup }) => (signup ? '34px' : '32px')};

  p {
    margin: ${({ update }) => (update ? '16px' : '8px')} 0 0 0;
  }

  a {
    color: ${({ theme }) => theme.colors.input};

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
