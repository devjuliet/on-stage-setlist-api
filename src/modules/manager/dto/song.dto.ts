export class SongDto {
  idSong: Number;
  name: String;
  artist: String;
  lyric: String;
  chordsGuitar: Boolean;
  tabGuitar: Boolean;
  chordsBass: Boolean;
  tabBass: Boolean;
  chordsPiano: Boolean;
  tabPiano: Boolean;
  tempo: Number;
  idTag: Number;
  idBand: Number;

  constructor() {
    this.idSong = 0;
    this.name = '';
    this.artist = '';
    this.lyric = '';
    this.chordsGuitar = false;
    this.tabGuitar = false;
    this.tabBass = false;
    this.chordsBass = false;
    this.chordsPiano = false;
    this.tabPiano = false;
    this.tempo = 0;
    this.idTag = 0;
    this.idBand = 0;
  }
}
