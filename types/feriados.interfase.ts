// Generated by https://quicktype.io

export interface Feriados {
    motivo:    string;
    tipo:      Tipo;
    info:      string;
    dia:       number;
    mes:       number;
    id:        string;
    original?: string;
}

export enum Tipo {
    Inamovible = "inamovible",
    Puente = "puente",
    Trasladable = "trasladable",
}