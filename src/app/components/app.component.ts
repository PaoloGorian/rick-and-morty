import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {combineLatest, Subscription} from 'rxjs';
import {ProfileCardInput} from '../model/ProfileCardInput';
import {Character} from '../interfaces/character.interface';
import {Episode} from '../interfaces/episode.interface';
import {Location} from '../interfaces/location.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'rick-and-morty';
  cards: ProfileCardInput[] = [];
  private characters: Character[] = [];
  private episodes: Episode[] = [];
  private locations: Location[] = [];
  private characterSubscription: Subscription;
  private episodeSubscription: Subscription;
  private locationSubscription: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {

    // Populate array of rick and morty objects
    // Characters
    this.characterSubscription = this.httpService.characters.getValues().subscribe(
      next => {
        this.characters.push(next);
      }
    );

    // Episodes
    this.episodeSubscription = this.httpService.episodes.getValues().subscribe(
      next => {
        this.episodes.push(next);
      }
    );

    // Locations
    this.locationSubscription = this.httpService.locations.getValues().subscribe(
      next => {
        this.locations.push(next);
      }
    );

    // When all three API returned all data, populate the cards
    combineLatest([
      this.httpService.characters.areValuesReady(),
      this.httpService.episodes.areValuesReady(),
      this.httpService.locations.areValuesReady()]
    ).subscribe(ready => {
        if (ready.every(elem => elem === true)) {
          this.cards = this.generateCards();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.characterSubscription.unsubscribe();
    this.episodeSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
  }

  private generateCards(): ProfileCardInput[] {
    const cardIndices = [];
    while (cardIndices.length < 12) {
      cardIndices.push(Math.floor(Math.random() * this.characters.length));
    }
    return cardIndices.map(index => {
      return new ProfileCardInput(index, this.characters, this.locations, this.episodes);
    });
  }

}
