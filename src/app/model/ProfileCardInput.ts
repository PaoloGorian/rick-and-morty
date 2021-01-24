import {Character} from '../interfaces/character.interface';
import {Location} from '../interfaces/location.interface';
import {Episode} from '../interfaces/episode.interface';

export class ProfileCardInput {
  name: string;
  image: string;
  status: string;
  species: string;
  type: string
  gender: string;
  locationName: string;
  locationDimension: string;
  locationResidents: string[];
  locationType: string;
  episodes: string[];

  constructor(characterIndex, characters: Character[], locations: Location[], episodes: Episode[]) {

    // Location related to the character
    const relatedLocation = locations.find(location => {
      try {
        return location.id === +characters[characterIndex].location.url.match('(?:location\\/)\\d+')[0].match('\\d+')[0];
      } catch (e) {
        console.log('got an unknown location: ', characters[characterIndex].name);
        return null;
      }
    });

    // All id of the residents of the related Location
    let locationResidentsId = [];
    if (relatedLocation) {
       locationResidentsId = relatedLocation.residents.map(residentUrl => {
        return residentUrl.match('(?:character\\/)\\d+')[0].match('\\d+')[0];
      });
    }

    // The episodes id
    const episodesId = characters[characterIndex].episode.map(episodeUrl => {
      return episodeUrl.match('(?:episode\\/)\\d+')[0].match('\\d+')[0];
    });

    this.name = characters[characterIndex].name;
    this.image = characters[characterIndex].image;
    this.status = characters[characterIndex].status;
    this.species = characters[characterIndex].species;
    this.type = characters[characterIndex].type;
    this.gender = characters[characterIndex].gender;
    this.locationName = characters[characterIndex].location.name;
    this.locationDimension = relatedLocation ? relatedLocation.dimension : null;
    this.locationResidents = locationResidentsId.map(id => {
      return characters.find(
        character => character.id === +id
      ).name;
    });
    this.locationType = relatedLocation ? relatedLocation.type : null;
    this.episodes = episodesId.map(id => {
      return episodes.find(
        episode => episode.id === +id
      ).name;
    });
  }
}
