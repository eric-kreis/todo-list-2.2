import styled from 'styled-components';

const IconButtonS = styled.button`
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
`;

export default IconButtonS;
