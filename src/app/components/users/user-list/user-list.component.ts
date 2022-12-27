import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/common/interfaces/player.intefaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  _playersService = inject(PlayersService);
  _router = inject(Router);
  searcher = new FormControl('');
  players$!: Observable<Player[]>;
  // constructor(private playersService: PlayersService){}

  ngOnInit() {
    // this._playersService
    //   .getPlayer()
    //   .subscribe((res) => console.log(`The player data = `, res));
    this.players$ = this._playersService.getPlayer();

    this.searcher.valueChanges.subscribe((search) => {
      if (search) {
        this.players$ = this._playersService.getPlayer(search);
      } else {
        this.players$ = this._playersService.getPlayer();
      }
    });
  }

  editPlayer(player: Player) {
    this._router.navigateByUrl('users/edit');
  }

  deletePlayer(player: Player) {
    if (confirm(`are you sure to delete the player ${player.name}?`)) {
    }
  }
}
