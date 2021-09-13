import { shade } from 'polished';
import styled from 'styled-components';

const PetModalS = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.text};
  margin: auto;
  max-width: 40%;
  min-width: 30%;
  text-align: center;

  .return-btn {
    background-color: whitesmoke;
    border: 0;
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.input};
    margin: 32px auto;
    padding: 8px 0;
    width: 80%;

    :hover {
      background-color: ${shade(0.08, 'whitesmoke')};
    }
  }

  .pet-section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }

  .select-section {
    justify-content: space-evenly;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 32px 32px 0;
  }

  .select-btn {
    align-items: center;
    display: flex;
    justify-content: space-between;

    button {
      align-items: center;
      display: flex;
      background-color: ${({ theme }) => shade(0.08, theme.colors.primary)};
      border: 0;
      border-radius: 50%;
      height: 150px;
      margin-right: 16px;
      overflow: hidden;
      width: 150px;

      :last-of-type {
        margin-right: 0;
        margin-left: 16px;
      } 

      img {
        height: 100%;
        width: 100%;
      }

      @media(max-width: 460px) {
        width: 100px;
        height: 100px;
      }
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 32px 32px 0;

    li {
      list-style-type: none
    }

    button {
      background-color: transparent;
      border: 0;
      border-radius: 50%;
      height: 70px;
      margin: 16px;
      overflow: hidden;
      width: 70px;

      img {
        height: 100%;
        width: 100%;
      }

      @media(max-width: 640px) {
        height: 50px;
        width: 50px;
      }

      @media(max-width: 390px) {
        height: 50px;
        width: 50px;
      }
    }
  }

  @media(max-width: 1200px) {
    max-width: 60%;
  }

  @media(max-width: 780px) {
    max-width: 75%;
  }

  @media(max-width: 640px) {
    max-width: 80%;
  }

  @media(max-width: 460px) {
    margin: 64px auto;
  }

  @media(max-width: 390px) {
    border-radius: 0;
    height: 100vh;
    margin: 0 auto;
    max-width: 100%;
    min-width: 100%;
  }
`;

export default PetModalS;
