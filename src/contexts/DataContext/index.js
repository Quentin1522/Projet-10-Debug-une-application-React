import PropTypes from "prop-types";//import des proptype
import {
  createContext,//crée un contexte
  useCallback,//crée une fonction memoisée
  useContext,//permet d'accéder au contexte dans un compsant
  useEffect,//exécite un effet de bord dans un composant fonctionnel
  useState,//gère l'atat du comosant fonctionnele
} from "react";

const DataContext = createContext({});// crée un contexte de donée avec une valeur par défaut vide

export const api = { //définit un objet contenant une fonction asynchrone loadData pour récupérer des données
  loadData: async () => {
    const json = await fetch("/events.json"); //effectue une requete pour récupérer des données depuis un fichier json
    return json.json();//renvoie les données au format json
  },
};

export const DataProvider = ({ children }) => {//défini un comosant dataProvider prenant des enfants
  const [error, setError] = useState(null);//état pour gérer les erreurs
  const [data, setData] = useState(null);//état pour stocker les données récupérér
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());//appelle de la fonction loadData pour obtenir les données
    } catch (err) {
      setError(err);//en ca d'erreur stocke l'erreur dans l'état
    }
  }, []);//les dépendances vides garantissent que la fonction est mémorisée
  useEffect(() => {//utilise useEffect pour éxécuter une action après le rendu du composant
    if (data) return;//si les données existnt déjà ne rien faire
    getData();//sinon récupérer les données
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {//définit les types de props attendus par dataProvider 
  children: PropTypes.node.isRequired,//children doit être un noeud react et obligatoire
}

export const useData = () => useContext(DataContext);//créer un hook personalisé pour accéder aux données

export default DataContext; 
