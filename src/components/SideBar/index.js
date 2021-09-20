/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../Contexts/AuthContext';
import { Creators as BarActions } from '../../redux/reducers/sideBar';

import { ColorPalette, Logout, ProfileIcon } from '../../assets/icons';
import SideBarS, { NullContainerS, SideButtonContainerS, SideButtonS } from './styles';
import ColorModal from './ColorsContainer';

export default function SideBar() {
  const { logout } = useAuth();
  const history = useHistory();

  const dispatch = useDispatch();

  const active = useSelector(({ sideBar }) => sideBar.active);

  const handleToggleBar = useCallback(() => (
    dispatch(BarActions.toggleBar())), [dispatch]);

  const handleDisableBar = useCallback(() => (
    dispatch(BarActions.disableBar())), [dispatch]);

  useEffect(() => handleDisableBar, [handleDisableBar]);

  return (
    <div>
      <SideBarS active={active}>
        <ul>
          <li>
            <SideButtonS type="button" onClick={() => history.push('/profile')}>
              {/* This "sidebar-icon" class is in ./styles.js */}
              <ProfileIcon className="sidebar-icon" />
              Perfil
            </SideButtonS>
          </li>
        </ul>
        <footer>
          <ul>
            <li>
              <SideButtonContainerS>
                <ColorPalette className="sidebar-icon" />
                Temas
                <ColorModal />
              </SideButtonContainerS>
            </li>
            <li>
              <SideButtonS type="button" onClick={logout}>
                <Logout className="sidebar-icon" />
                Sair
              </SideButtonS>
            </li>
          </ul>
        </footer>
      </SideBarS>
      {active && <NullContainerS type="button" onClick={handleToggleBar} />}
    </div>
  );
}
