import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';

import { Creators as ThemeActions } from '../../redux/reducers/changeTheme';
import { Creators as BarActions } from '../../redux/reducers/sideBar';

import Logo from '../../assets/Logo';
import PageHeaderS, { HeaderDivisionS, ImageContainerS } from './styles';
import { Sun, Moon, Menu } from '../../assets/icons';
import { usePhoto } from '../../Contexts/PhotoContext';

export default function Header({ children }) {
  const { title, colors } = useContext(ThemeContext);
  const { image, loading } = usePhoto();

  const dispatch = useDispatch();

  const handleToggleTheme = useCallback(() => (
    dispatch(ThemeActions.toggleTheme())), [dispatch]);

  const handleToggleBar = useCallback(() => (
    dispatch(BarActions.toggleBar())), [dispatch]);

  return (
    <PageHeaderS>
      <HeaderDivisionS>
        <button type="button" onClick={handleToggleBar}>
          <Menu />
        </button>
        <Logo />
      </HeaderDivisionS>
      <h1>{ children }</h1>
      <HeaderDivisionS>
        <ImageContainerS>
          <Link to="/profile">
            { !loading && <img alt="Profile" src={image} /> }
          </Link>
        </ImageContainerS>
        <Switch
          checked={title === 'dark'}
          onChange={handleToggleTheme}
          checkedIcon={<Sun className="sun" />}
          uncheckedIcon={<Moon className="moon" />}
          height={16}
          handleDiameter={24}
          width={42}
          offColor={colors.background}
          onColor={colors.background}
        />
      </HeaderDivisionS>
    </PageHeaderS>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
