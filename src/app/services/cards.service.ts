import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para el tipo de datos que esperamos de la API
export interface Card {
  id: string;
  manaCost: number;
  name: string;
  type: string;
  imageUrl: string;
  rarity: string;
}

// Interfaz para el payload que envías en el POST
export interface CardsPayloadDto {
  // Ajusta estas propiedades según lo que tu backend requiera
  searchTerm: string;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  // Ajusta la base URL según la dirección de tu API Nest
  private readonly baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  /**
   * Consumir el endpoint POST /cards
   * Recibe un payload de tipo CardsPayloadDto y 
   * devuelve un array de Card
   */
  fetchCards(payload: CardsPayloadDto): Observable<Card[]> {
    return this.http.post<Card[]>(`${this.baseUrl}/cards`, payload);
  }

  /**
   * Consumir el endpoint GET /cards/:id
   * Retorna un objeto Card
   */
  getCardById(id: string): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}/cards/${id}`);
  }
}
