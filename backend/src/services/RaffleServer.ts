
import GameServer from './GameServer';
import { User } from '../models/User';

class RaffleServer extends GameServer {
  constructor(user: User) {
    super(user);
  }

  public enterRaffle(): void {
    if (this.user) {
        console.log(`User ${this.user.uid} entered the raffle.`);
    }
  }
}

export default RaffleServer;
