import { User } from "../models/User";

class GameServer {
    protected user: User | null;

    constructor(user: User) {
        this.user = user;
    }

    public getUser(): User | null {
        return this.user;
    }
    
}

export default GameServer;
