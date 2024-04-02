import React, { useState } from "react";
import Menu from "../../containers/Menu";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import { useData } from "../../contexts/DataContext";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";

import "./style.scss";

const Home = () => {
  // Utilisation du hook useData pour récupérer les données
  const { data } = useData();
  let last;

  // Si data est défini, vérifie si data.events est défini.
  // Si data.events est défini, récupère le dernier élément du tableau events.
  if (data && data.events && data.events.length > 0) {
    last = data.events[data.events.length - 1];
  } else {
    last = null;
  }

  // État local pour gérer le message de confirmation
  const [confirmationMessage, setConfirmationMessage] = useState("");

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <section className="SliderContainer">
          <Slider />
        </section>
        <section className="ServicesContainer">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
          </div>
        </section>
        <section className="EventsContainer">
          <h2 className="Title">Nos réalisations</h2>
          <EventList />
        </section>
        <section className="PeoplesContainer">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d’experts dédiés à l’organisation de vos événements</p>
          <div className="ListContainer">
          <PeopleCard
            imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
            name="Samira"
            position="CEO"
          />
          <PeopleCard
            imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
            name="Jean-baptiste"
            position="Directeur marketing"
          />
          <PeopleCard
            imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png"
            name="Alice"
            position="CXO"
          />
          <PeopleCard
            imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png"
            name="Luís"
            position="Animateur"
          />
          <PeopleCard
            imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png"
            name="Christine"
            position="VP animation"
          />
          <PeopleCard
            imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png"
            name="Isabelle"
            position="VP communication"
          />
        </div>
        </section>
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div id="messageConfirm" className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>Merci pour votre message, nous tâcherons de vous répondre dans les plus brefs délais.</p>
              </div>
            }
          >
            {/* Utilisation du composant Form avec le message de confirmation */}
            {({ setIsOpened }) => (
              <Form
  onSuccess={() => {
    setIsOpened(true);
    setConfirmationMessage("Message envoyé !");
  }}
  onError={() => null}
  setConfirmationMessage={setConfirmationMessage} // Utilisation de setConfirmationMessage ici
/>
            )}
          </Modal>
        </div>
      </main>
      <footer className="row">
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          {/* Vérifie si la variable last existe et si elle contient un titre et une image */}
          {last && last.cover && last.title && last.date && last.type && (
            <EventCard
              imageSrc={last.cover}
              title={last.title}
              date={new Date(last.date)}
              small
              label={last.type}
            />
          )}
        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            <a href="#twitch">
              <Icon name="twitch" />
            </a>
            <a href="#facebook">
              <Icon name="facebook" />
            </a>
            <a href="#twitter">
              <Icon name="twitter" />
            </a>
            <a href="#youtube">
              <Icon name="youtube" />
            </a>
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence événementielle propose des prestations de service
            spécialisées dans la conception et l'organisation de divers événements
            tels que des événements festifs, des manifestations sportives et
            culturelles, des événements professionnels
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;