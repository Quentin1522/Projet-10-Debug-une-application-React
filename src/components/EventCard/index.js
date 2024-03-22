import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";


import "./style.scss";

//définition du composant EventCard
const EventCard = ({
  //url de l'image de l'évenement
  imageSrc,
  //Texte de l'image
  imageAlt,
  //date de l'évenement, par défaut la date actuel
  date = new Date(),
  //titre de l'évenement
  title,
  //ériquette de l'évenement
  label,
  //indique si la carte est petit par défaualt false
  small = false,
  //nouvelle prop rin
  ...props
}) => (
    <div id="realisations"
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

  //définiation des types attendus des props pour le composant EventCard
EventCard.propTypes = {
  //URL se l'image requise
  imageSrc: PropTypes.string.isRequired,
  //texte de l'image
  imageAlt: PropTypes.string,
  //date de l'évenement requis
  date: PropTypes.instanceOf(Date).isRequired,
  //titre de l'évenement requis
  title: PropTypes.string.isRequired,
  //indique su la carte est petite
  small: PropTypes.bool,
  //étiquette de l'évenement requise
  label: PropTypes.string.isRequired,
};

//définition des valeurs par défaut des props pour le comosant EventCard
EventCard.defaultProps = {
  //texte de l'image
  imageAlt: "image",
  //par défault la carte n'est pas petite
  small: false,
}

export default EventCard;
