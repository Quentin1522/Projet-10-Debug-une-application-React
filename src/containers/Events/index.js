import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements par page

const EventList = () => {
  const { data, error } = useData(); // Récupération des données d'événements et des erreurs à partir du contexte
  const [type, setType] = useState(null); // État pour stocker le type d'événement sélectionné pour le filtrage
  const [currentPage, setCurrentPage] = useState(1); // État pour stocker le numéro de la page actuelle pour la pagination

  // Fonction appelée lorsqu'un nouveau type d'événement est sélectionné
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialisation de la page actuelle à la première page
    setType(evtType); // Mise à jour du type d'événement sélectionné
  };

  // Création d'un ensemble de types d'événements uniques à partir des données disponibles
  const typeList = new Set(data?.events.map((event) => event.type));

  // Filtrage des événements en fonction du type sélectionné
  let filteredEvents = data?.events || [];
  if (type) {
    filteredEvents = filteredEvents.filter((event) => event.type === type);
  }

  // Calcul des indices de début et de fin pour la pagination
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  // Sélection des événements à afficher sur la page actuelle
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  // Calcul du nombre total de pages nécessaires pour paginer tous les événements filtrés
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          {/* Sélecteur pour choisir le type d'événement */}
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value)}
          />

          {/* Conteneur pour afficher les cartes d'événements */}
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              // Modal pour afficher les détails de l'événement lorsqu'il est cliqué
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  // Carte d'événement affichant les informations de base de l'événement
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>

          {/* Pagination pour naviguer entre les pages d'événements */}
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, index) => (
              <a
                key={index}
                href="#events"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;