export interface Area {
    id: string;
    locName: string;
    googleLoc: string;
    cordinates: Cordinates;
    active: boolean;
  }
  
  export interface Cordinates {
    lat: string;
    lng: string;
  }