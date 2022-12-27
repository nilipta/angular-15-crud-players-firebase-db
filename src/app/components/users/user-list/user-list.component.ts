import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  _playersService = inject(PlayersService);
  // constructor(private playersService: PlayersService){}

  ngOnInit() {
    this._playersService
      .getPlayer()
      .subscribe((res) => console.log(`The player data = `, res));
  }
}
