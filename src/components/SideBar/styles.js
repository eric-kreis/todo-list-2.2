import { transparentize } from 'polished';
import styled from 'styled-components';

const SideBarS = styled.aside`
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(calc(var(--vh, 1vh) * 100) - 48px);
  left: ${({ active }) => (active ? 0 : '-200px')};
  position: absolute;
  transition: left 0.3s ease;
  top: 48px;
  width: 200px;
  z-index: 2;

  .sidebar-icon {
    margin-right: 16px;
  }

  ul {
    width: 100%;
    padding: 0;

    li {
      height: 50px;
      color: ${({ theme }) => theme.colors.text};
      list-style-type: none;
      margin: 0;
      position: relative;
      width: 100%;

      :hover {
        background-color: ${({ theme }) => theme.colors.background};
        transition: all 0.5s ease;
        cursor: pointer;
      }
    }
  }

  @media(max-width: 394px) {
    top: 58px;
    height: calc(calc(var(--vh, 1vh) * 100) - 58px);
  }
`;

export const NullContainerS = styled.button`
  background-color: ${({ theme }) => transparentize(0.3, theme.modal.windowBackground)};
  border: 0;
  height: calc(calc(var(--vh, 1vh) * 100) - 48px);
  left: 0;
  position: absolute;
  top: 48px;
  z-index: 1;
  width: 100%;

  :hover {
    cursor: default;
  }

  @media(max-width: 394px) {
    top: 58px;
    height: calc(calc(var(--vh, 1vh) * 100) - 58px);
  }
`;

export const SideButtonS = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  font-size: 16px;
  height: 100%;
  padding: 0 16px;
  width: 100%;
`;

export const SideButtonContainerS = styled.div`
  align-items: center;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  font-size: 16px;
  height: 100%;
  padding: 0 16px;
  width: 100%;
`;

export default SideBarS;
