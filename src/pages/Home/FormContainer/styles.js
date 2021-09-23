/* eslint-disable no-magic-numbers */
import styled from 'styled-components';
import { transparentize, shade } from 'polished';

export const MainFormS = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StatusSectionS = styled.section`
  align-items: center;
  color: ${({ theme }) => transparentize(0.3, theme.colors.text)};
  display: flex;
  height: 20px;
  position: absolute;

  img {
    height: ${({ isSaving }) => (isSaving ? '10px' : 0)};
    margin-right: ${({ isSaving }) => (isSaving ? '6px' : 0)};
    visibility: ${({ isSaving }) => (isSaving ? 'visible' : 'hidden')};
    width: ${({ isSaving }) => (isSaving ? '10px' : 0)};
  }

  .check-icon {
    height: ${({ isSaving }) => isSaving && 0};
    margin-right: ${({ isSaving }) => (isSaving ? 0 : '2px')};
    visibility: ${({ isSaving }) => (isSaving ? 'hidden' : 'visible')};
    width: ${({ isSaving }) => isSaving && 0};
  }

  span {
    font-size: 10px;
  }
`;

export const SectionFormS = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 16px;
  width: 100%;

  :last-of-type {
    @media(max-width: 560px) {
      flex-wrap: wrap;
    }
  }
`;

export const FormShowButtonS = styled.button`
  background-color: ${({ theme, display, value }) => {
    if (display === value) {
      if (theme.title === 'light') {
        return transparentize(0.32, theme.colors.primary);
      }
      return transparentize(0.6, theme.colors.primary);
    }
    return shade(0.05, theme.colors.primary);
  }};
  border: 0;
  border-radius: 2px;
  color: ${({ theme }) => shade(0.05, theme.colors.text)};
  font-size: 18px;
  margin: 8px;
  min-width: 100px;
  width: 120px;

  :hover {
    background-color: ${({ theme }) => (
    transparentize(0.15, theme.colors.primary))};
  }

  @media(max-width: 880px) {
    font-size: 16px;
  }

  @media(max-width: 768px) {
    font-size: 18px;
  }
`;

export const IconButtonS = styled.button`
  background-color: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  padding: 2px;
  margin: 24px 0 24px 24px;

  :hover {
    color: ${({ add, clear, theme }) => {
    if (add) return '#63BE25';
    if (clear) return 'red';
    return theme.colors.primary;
  }};
  }

  @media(max-width: 560px) {
    margin: 24px 0 24px 14px;
  }
`;
