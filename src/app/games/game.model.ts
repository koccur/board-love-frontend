export interface Game {
    id?: number;
    title: string;
    description?: string;
    genre: {name:string};
    releaseDate: string;
    numberOfPlayers: number;
    time?: number;
    ageRestriction?: number;
  }

export interface AssignGameDto{
  gameId:number;
  userId:number;
}