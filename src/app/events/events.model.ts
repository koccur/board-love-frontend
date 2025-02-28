import { Game } from "../games/game.model";
import { User } from "../users/users.model";

export interface EventGame {
    id: number;
    description: string;
    date: string;
    title: string;
    maxParticipants: number;
    organizer: User;
    game?: Game;
    participants?: User[];
    location: string;
}

export interface CreateEventDto {
    description: string;
    date: string;
    title: string;
    maxParticipants: number;
    organizerId: number;
    gameId?: number;
    participantsIds?: number[];
    location: string;
}

export interface UpdateEventDto {
    title: string;
    description: string;
    date: string;
    maxParticipants: number;
    gameId?: number;
    participantsIds?: number[];
    location: string;
}