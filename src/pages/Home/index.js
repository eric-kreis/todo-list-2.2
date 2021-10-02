import React, { useEffect, useState } from 'react';
import { ToastContainer, Flip } from 'react-toastify';

import ClearModalContainer from './ClearModalContainer';
import Header from '../../components/Header';
import FormContainer from './FormContainer';
import List from './List';
import Footer from '../../components/Footer';

import { HomeMainS, HomeSectionS } from './styles';
import SideBar from '../../components/SideBar';

export default function Home() {
  const [clearModal, setClearModal] = useState(false);

  const handleToggleModal = () => setClearModal((prevClear) => !prevClear);

  useEffect(() => {
    document.title = 'Lista';
  }, []);

  return (
    <div>
      <ToastContainer transition={Flip} />
      <ClearModalContainer clearModal={clearModal} handleToggleModal={handleToggleModal} />
      <Header handleToggleModal={handleToggleModal}>LISTA DE TAREFAS</Header>
      <HomeMainS>
        <HomeSectionS>
          <SideBar />
          <FormContainer handleToggleModal={handleToggleModal} />
          <List />
        </HomeSectionS>
        <Footer />
      </HomeMainS>
    </div>
  );
}
