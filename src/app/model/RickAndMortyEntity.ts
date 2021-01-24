import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

export class RickAndMortyEntity<T> {
  private values = new ReplaySubject<T>();
  private valuesReady = new BehaviorSubject(false);

  areValuesReady(): Observable<boolean> {
    return this.valuesReady.asObservable();
  }

  setReady(): void {
    this.valuesReady.next(true);
  }

  getValues(): Observable<T> {
    return this.values.asObservable();
  }

  setValues(value: T): void {
    this.values.next(value);
  }
}
