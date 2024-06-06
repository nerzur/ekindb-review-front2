export class UpdateLote{
    tagsList : string[];
    prevLote: string;
    newLote: string;
    isVaciado: boolean;


    constructor(tagsList: string[], prevLote: string, newLote: string, isVaciado: boolean) {
        this.tagsList = tagsList;
        this.prevLote = prevLote;
        this.newLote = newLote;
        this.isVaciado = isVaciado;
    }
}
