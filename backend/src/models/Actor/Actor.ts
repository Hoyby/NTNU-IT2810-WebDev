export interface IActor {
  person: any;
  moviesPlayedIn: [];
}

export class Actor implements IActor {
  readonly person: any;
  readonly moviesPlayedIn: [];

  constructor(person, moviesPlayedIn) {
    this.person = person;
    this.moviesPlayedIn = moviesPlayedIn;
  }

  public getPerson() {
    return this.person;
  }

  public getMoviesPlayedIn() {
    return this.moviesPlayedIn;
  }
}
