export interface PostModel {
  id: number;
  title: string;
  content: string;
  lat?: string;
  long?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  expanded?:Boolean

}

export interface PostModelCollapsable {
  id: number;
  title: string;
  content: string;
  lat?: string;
  long?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  expanded:Boolean
  counter?:number
}

export interface PageRouting {
  route: string,
  icon:string,
  title?:string,
  view:Boolean
}

export interface GeocodingObject {
  latitude: number;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  localityInfo: LocalityInfo;
}

export interface LocalityInfo {
  administrative: Administrative[];
  informative: Informative[];
}

export interface Informative {
  order: number;
  name: string;
  description: string;
  isoCode?: string;
  wikidataId?: string;
  geonameId?: number;
}

interface Administrative {
  order: number;
  adminLevel: number;
  name: string;
  description: string;
  isoName?: string;
  isoCode?: string;
  wikidataId: string;
  geonameId: number;
}
