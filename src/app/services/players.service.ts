import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  query,
  collectionData,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Player } from '../common/interfaces/player.intefaces';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private fireStore: Firestore) {}

  addPlayer(player: Player) {
    const playerRef = collection(this.fireStore, 'players');
    return addDoc(playerRef, player);
  }

  getPlayer(filter = '') {
    const playerRef = collection(this.fireStore, 'players');
    let player = query(playerRef);
    if (filter) {
      player = query(playerRef, where('name', '==', filter));
    }
    return collectionData(player) as unknown as Observable<Player[]>;
  }

  async updatePlayer(player: Player) {
    console.debug('update player = ', player);
    const playerRef = collection(this.fireStore, 'players');
    let q = query(playerRef, where('id', '==', player.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.fireStore, 'players', document.id);
      await updateDoc(docRef, { ...player });
    });
  }

  async deletePlayer(id: string) {
    const playerRef = collection(this.fireStore, 'players');
    const q = query(playerRef, where('id', '==', id));
    const querySnapshots = await getDocs(q);

    querySnapshots.forEach(async (document) => {
      const docRef = doc(this.fireStore, 'players', document.id);
      await deleteDoc(docRef);
    });
  }
}
