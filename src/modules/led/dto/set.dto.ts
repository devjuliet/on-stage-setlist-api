export class SetDto{
    idSet: Number;
    name: string;
    description: string;
    haveImage: boolean;
    idBand: number;
    songs : Song[];
    constructor(){
        this.idSet = 0;
        this.name = "";
        this.description = "";
        this.haveImage = false;
        this.idBand = 0;
        this.songs = [];
    }
}

class Song{
    idSong: Number;
    name: string;
    constructor(){
        this.idSong = 0;
        this.name = "";
    }
}