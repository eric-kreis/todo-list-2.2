import styled from 'styled-components';
import { shade } from 'polished';

const background = (provider) => (
  (provider === 'google' && '#E9453D')
  || (provider === 'github' && '#212121')
);

const ProviderButtonS = styled.button`
  background-color: ${({ name }) => background(name)};
  border: 0;
  border-radius: 3px;
  padding: 8px 0;
  color: whitesmoke;
  cursor: pointer;
  width: 35%;

  * {
    font-size: 24px;
  }

  :hover {
    background-color: ${({ name }) => shade(0.1, background(name))};
  }
`;

export default ProviderButtonS;