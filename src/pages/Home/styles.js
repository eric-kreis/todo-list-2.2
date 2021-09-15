import styled from 'styled-components';

export const HomeSectionS = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  padding: 32px 64px 16px;
  transition: margin width 0.5s ease;
  width: 48%;

  @media(max-width: 1080px) {
    width: 70%;
  }

  @media(max-width: 768px) {
    padding: 32px 20px 16px;
    width: 75%;
  }

  @media(max-width: 560px){
    padding: 32px 0 20px;
  }

  @media(max-width: 400px) {
    width: 80%;
  }

  @media(max-width: 360px) {
    width: 90%;
  }
`;

export const HomeMainS = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(calc(var(--vh, 1vh) * 100) - 48px);

  @media(max-width: 375px) {
    min-height: calc(calc(var(--vh, 1vh) * 100) - 54px);
  }
`;
