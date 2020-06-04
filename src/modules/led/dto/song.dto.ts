

export class SongDto{
    idSong: number;
    name: string;//
    artist: string;//
    lyric: string;
    chordsGuitar: boolean;
    tabGuitar: boolean;
    chordsBass: boolean;
    tabBass: boolean;
    chordsPiano: boolean;
    tabPiano: boolean;
    tempo: number;//
    idBand: number;
    idTag: number;

    constructor(){
        this.idSong = 0;
        this.name = "";
        this.artist = "";
        this.lyric = "";
        this.chordsGuitar = false;
        this.tabGuitar = false;
        this.chordsBass = false;
        this.tabBass = false;
        this.chordsPiano = false;
        this.tabPiano = false;
        this.tempo = 0;
        this.idBand = 0;
        this.idTag = 0;
    }
}