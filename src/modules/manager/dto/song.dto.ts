export class SongDto {
  idSong: Number;
  name: String;
  artist: String;
  lyric: String;
  chordsGuitar: Number;
  tabGuitar: Number;
  chordsBass: Number;
  tabBass: Number;
  chordsPiano: Number;
  tabPiano: Number;
  tempo: Number;
  idTag: Number;
  idBand: Number;

  constructor() {
    this.idSong = 0;
    this.name = '';
    this.artist = '';
    this.lyric = '';
    this.chordsGuitar = 0;
    this.tabGuitar = 0;
    this.tabBass = 0;
    this.chordsBass = 0;
    this.chordsPiano = 0;
    this.tabPiano = 0;
    this.tempo = 0;
    this.idTag = 0;
    this.idBand = 0;
  }
}
