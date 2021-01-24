import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Character} from '../interfaces/character.interface';
import {Location} from '../interfaces/location.interface';
import {Episode} from '../interfaces/episode.interface';
import {environment} from '../../environments/environment.prod';
import {RickAndMortyEntity} from '../model/RickAndMortyEntity';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  characters = new RickAndMortyEntity<Character>();
  locations = new RickAndMortyEntity<Location>();
  episodes = new RickAndMortyEntity<Episode>();

  constructor(private httpClient: HttpClient) {

    // Get all characters
    this.getRickAndMortyAPI(this.characters, environment.characterAPIUrl);

    // Get all locations
    this.getRickAndMortyAPI(this.locations, environment.locationAPIUrl);

    // Get all episodes
    this.getRickAndMortyAPI(this.episodes, environment.episodeAPIUrl);
  }

  // Http call
  private getRickAndMortyAPI(rickAndMortyEntity: RickAndMortyEntity<any>, url: string): void {
    this.httpClient.get<any>(
      url
    )
      .subscribe(
        result => {
          result.results
            .forEach(apiValue => rickAndMortyEntity.setValues(apiValue));
          if (result.info.next) {
            this.getRickAndMortyAPI(rickAndMortyEntity, result.info.next);
          } else {
            rickAndMortyEntity.setReady();
          }
        },
        error => {
          console.log('getRickAndMortyAPI returned an error: ', error);
        }
      );
  }
}
