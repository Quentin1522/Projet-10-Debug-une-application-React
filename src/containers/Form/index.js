import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

//simule un appel à une API
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

//définition du composant form
const Form = ({ onSuccess, onError }) => {
  //déclaration de l'état local pour gérer l'envoir du formulaire
  const [sending, setSending] = useState(false);
  //déclaration de l'état local pour gérer le message de confirmation
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  //calback pour envoyer le formulaire
  const sendContact = useCallback(
    async (evt) => {
      //empeche le comportement par défault
      evt.preventDefault();
      //maj de l'état pour indiquer que l'envoie est en cours
      setSending(true);

      //vérifie si un champ est vide
      const formFields = evt.target.elements;
      let isAnyFieldEmpty = false;
      for (let i = 0; i < formFields.length; i ++){
        //vérifie su l'élment est un champ de saisie (input) ou un champ de texte (textarea)
        if (formFields[i].nodeName === "INPUT" || formFields[i].nodeName === "TEXTEREA"){
          //vérifie si la valeur du champ est vide ou ne contient que des espaces
          if (!formFields[i].value.trim()){
            isAnyFieldEmpty = true;
            break;
          }
        }
      }
      //si un champ est vide,affiche un message d'erreur
      if(isAnyFieldEmpty){
        setConfirmationMessage("Veuillez remplir tous les champs du formulaire");
      return;
      }
      //maj de l'état pour indiquer que l'envoir du formualire est en cours
      setSending(true);

      //appel de l'API similée pour envoyer les données du formulaire
      try {
        //appel de la fonction mockContactApi
        await mockContactApi();
        //maj de l'état après l'envoie réussi 
        setSending(false);
        //message de confirmation
        setConfirmationMessage("Message envoyé !")
      } catch (err) {
        //maj de l'état en cas d'erreur
        setSending(false);
        //appel de la fonction onError avec l'erreur
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      {/*affichage du message de confirmation*/}
      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

//validation des propriétés du composant Form
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

//définiation des valeurs par défaut des propriétés du composant form
Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
