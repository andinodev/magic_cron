import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardsService, Card, CardsPayloadDto } from 'src/app/services/cards.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  // Aquí guardamos el array de cartas que retornará el POST
  cards: Card[] = [];

  // Aquí guardamos la carta individual que retornará el GET
  selectedCard?: Card;

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    // Ejemplo: Llamar al servicio fetchCards() al iniciar
    // con un payload de ejemplo.
    this.getAllCards();
  }

  getAllCards() {
    const payload: CardsPayloadDto = {
      searchTerm: 'ejemplo',
      limit: 10,
    };
    this.cardsService.fetchCards(payload).subscribe({
      next: (data: Card[]) => {
        this.cards = data;
      },
      error: (error) => {
        console.error('Error al cargar cartas:', error);
      }
    });
  }

  getCardDetail(id: string) {
    this.cardsService.getCardById(id).subscribe({
      next: (data: Card) => {
        this.selectedCard = data;
      },
      error: (error) => {
        console.error('Error al cargar la carta:', error);
      }
    });
  }
}
