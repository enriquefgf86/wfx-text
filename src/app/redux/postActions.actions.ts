import { createAction, props } from '@ngrx/store';
import { GeocodingObject, PostModel } from './../interfaces/interfaces';


export const gettingAllPostsOrder= createAction(
  '[Post] getAllPostOrder'
);

export const gettingAPostsOrder= createAction(
  '[Post] getAPostOrder',props<{ id: string }>()
);

export const gettingGeoOrder= createAction(
  '[Post] gettingGeoOrder'
);



export const getAllPost = createAction(
  '[Post] getAllPost',
  props<{ allPostsRetrieved: PostModel[] }>()
);

export const getAllReverseGeocoding = createAction(
  '[Post] getAllRev',
  props<{ allRevGeoRetrieved:GeocodingObject[] }>()
);


export const getAPost = createAction(
  '[Post] getAPost',
  props<{ aPostRetrieved: PostModel }>()
);

export const createAPost = createAction(
  '[Post] createAPost',
  props<{ aPostCreated: PostModel }>()
);

