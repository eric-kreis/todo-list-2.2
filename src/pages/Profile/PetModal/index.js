import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import ModalWindowS from '../../../styles/ModalWindowS';
import PetModalS, { ChooseSectionS, PetSectionS, ReturnButtonS } from './styles';

import dogs from '../../../assets/dogs';
import cats from '../../../assets/cats';

export default function PetModal({
  pets,
  setPets,
  handleSelectPet,
  setOpenPetModal,
}) {
  const images = {
    dog: dogs,
    cat: cats,
  };

  return (
    <ModalWindowS>
      <PetModalS>
        { !pets ? (
          <ChooseSectionS>
            <section>
              <button type="button" value="cat" onClick={() => setPets('cat')}>
                <img src={cats[1]} alt="Gato" />
              </button>
              <button type="button" value="dog" onClick={() => setPets('dog')}>
                <img src={dogs[1]} alt="Cachorro" />
              </button>
            </section>
            <ReturnButtonS type="button" onClick={() => setOpenPetModal(false)}>
              Voltar
            </ReturnButtonS>
          </ChooseSectionS>
        ) : (
          <PetSectionS>
            <ul>
              { images[pets].map((img) => (
                <li key={uuidv4()}>
                  <button type="button" src={img} onClick={() => handleSelectPet(img)}>
                    <img src={img} alt="Pet" />
                  </button>
                </li>
              )) }
            </ul>
            <ReturnButtonS type="button" onClick={() => setPets('')}>
              Voltar
            </ReturnButtonS>
          </PetSectionS>
        ) }
      </PetModalS>
    </ModalWindowS>
  );
}

PetModal.propTypes = {
  pets: PropTypes.string.isRequired,
  setPets: PropTypes.func.isRequired,
  handleSelectPet: PropTypes.func.isRequired,
  setOpenPetModal: PropTypes.func.isRequired,
};
