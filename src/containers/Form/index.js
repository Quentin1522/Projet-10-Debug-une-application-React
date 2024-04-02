import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Fonction de simulation d'appel à une API
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); });

// Définition du composant Form
const Form = ({ onSuccess, onError, setConfirmationMessage }) => {
  // État local pour gérer l'envoi du formulaire
  const [sending, setSending] = useState(false);

  // Callback pour envoyer le formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      const formFields = evt.target.elements;
      let isAnyFieldEmpty = false;
      for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].nodeName === "INPUT" || formFields[i].nodeName === "TEXTAREA") {
          if (!formFields[i].value.trim()) {
            isAnyFieldEmpty = true;
            break;
          }
        }
      }

      if (isAnyFieldEmpty) {
        setConfirmationMessage("Veuillez remplir tous les champs du formulaire");
        onError()
        return;
      }

   try {
        await mockContactApi();
        setSending(false);
        setConfirmationMessage("Message envoyé !");
        onSuccess(); // Appeler onSuccess lorsque l'envoi réussit
      } catch (err) {
        setSending(false);
        onError(err); // Appeler onError en cas d'erreur
      }
    },
    [onSuccess, onError, setConfirmationMessage]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
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
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

// Validation des propriétés du composant Form
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  setConfirmationMessage: PropTypes.func, // Ajout de la validation pour la fonction de mise à jour du message de confirmation
};

// Définition des valeurs par défaut des propriétés du composant Form
Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
  setConfirmationMessage: () => null, // Définition d'une fonction vide par défaut
};

export default Form;