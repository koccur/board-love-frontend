import { Game } from "../games/game.model";
import { Spot } from "../spots/spots.model";
import { User } from "../users/users.model";

export interface EventGame {
    date: string;
    description: string;
    games?: Game[];
    id: number;
    isPrivate:boolean;
    maxParticipants: number;
    organizer: User;
    participants?: User[];
    spot: Spot;
    title: string;
}

export interface CreateEventDto {
    date: string;
    description: string;
    gameIds?: number;
    isPrivate:boolean;
    maxParticipants: number;
    organizerId: number;
    participantsIds?: number[];
    spotId?: number;
    title: string;
}

export interface UpdateEventDto {
    date: string;
    description: string;
    gameIds?: number;
    isPrivate:boolean;
    maxParticipants: number;
    participantsIds?: number[];
    spotId?: number;
    title: string;
}