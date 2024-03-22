import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";


//définition du composant modal
const Modal = ({ opened, Content, children }) => {
  //Déclaration de l'état local isOpened et de la fonction setIsOpened
  const [isOpened, setIsOpened] = useState(opened);
  return (
    <>
    {/*rendu du composant enfant avec les propriétés isOpened et setIsOpened*/}
      {children({ isOpened, setIsOpened })}
      {/*rendu conditionnel du modal s'il est ouvert*/}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {/*rendu du contenu passé en tant que prop Content*/}
            {Content}

            {/*bouton de fermeture du modal avec l'icône de fermeture*/}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
              //action pour fermer le modal lors du click sur le bouton
            >
              {/*affichage de l'icône de fermuture*/}
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};


//définiation des valeurs par défaut des props
Modal.defaultProps = {
  //par défault la modal est fermé
  opened: false,
}

//définition des types des props attendues par le composant modal
Modal.propTypes = {
  //la prop doit être un booléen
  opened: PropTypes.bool,
  //la prop COntent doit être un noeurd React valide et obligatoire
  Content: PropTypes.node.isRequired,
  //la prop children doit être une fonctionne valide et obligatoire
  children: PropTypes.func.isRequired,
}

export default Modal;
