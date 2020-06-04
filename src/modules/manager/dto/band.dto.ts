
export class BandDto {
    idBand: Number;
    name: String;
    urlLogo: String;
    description: String;
    idUserManager: Number;
    genres : Genre[];
    bandMembers: BandMember[];
    bandLiveDesigners : Number[];
    sets : Set[];

    constructor() {
        this.idBand = 0;
        this.name = "";
        this.urlLogo = "";
        this.description = "";
        this.idUserManager = 0;
        this.genres = [];
        this.bandMembers = [];
        this.bandLiveDesigners = [];
        this.sets = [];
    }
}
class BandMember {
    idMember: Number;
    role: Number;
    name: String;
    haveImage: Boolean;
    idUser : number;

    constructor() {
        this.idMember = 0;
        this.role = 0;
        this.name = "";
        this.haveImage = false;
        this.idUser = 0;
    }
}
class Genre {
    public idGenre: number;
    public name: String;
 
    constructor() {
        this.idGenre = 0;
        this.name = "";
    }
}
class Set {
    idSet: Number;
    name: String;
    haveImage : Boolean;
    description : string;

    constructor() {
        this.idSet = 0;
        this.name = "";
        this.haveImage = false;
        this.description = "";
    }
}
