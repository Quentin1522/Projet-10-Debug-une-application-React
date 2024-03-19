import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; //nombre d'élement sur la page

const EventList = () => {
  //gestion de l'état
  const { data, error } = useData(); //initialise les états data et error en utilisant le kook useData
  const [type, setType] = useState(); //initialise l'état type en utilisant  useState
  const [currentPage, setCurrentPage] = useState(1); //initile l'état de la page actuelle en utilisant useSate
  
  //filtrer les évenements en fonction du type et de la page actuel
  const filteredEvents = (
    //exprssion ternaire si "type" est définie alors la liste "date?.events" 
    //est filtrer pour ne contenir que les évenements dont le type correspond à "type"
    (type ? data?.events.filter(event => event.type === type) : data?.events) || [])
    //une fois le filtre effectué filtrer un autre filtre les évenement en fonction de leurs index
    .filter((event, index) => {
// Vérifie si l'index de l'événement actuel est dans la plage des indices à afficher sur la page courante
// Calcul : index de début de la page courante <= index de l'événement < index de fin de la page courante
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      // Retourne true si l'événement doit être inclus dans la liste filtrée
      return true;
    }
    // Retourne false si l'événement ne doit pas être inclus dans la liste filtrée
    return false;
  });


  //fonction pour changer le filtre type d'évenement 
  const changeType = (evtType) => {
    setCurrentPage(1);//réinitialiser la page actuelle à 1
    setType(evtType);//définie le filtre du type d'évenement
  };

  //calcule le nombre de pages en fonction des évnement filtrés
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  //obtien le liste des types d'évenement uniques
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
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
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
