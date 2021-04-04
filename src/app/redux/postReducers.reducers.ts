import { GeocodingObject, PostModel } from './../interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import * as post from '../redux/postActions.actions';

export interface StatePosts {
  allPosts: PostModel[];
  selectedPost: PostModel;
  loading: boolean;
  idPost: string;
  allReverseGeo: GeocodingObject[];
  loaderGeo:boolean
}

export const initialState: StatePosts = {
  allPosts: [],
  selectedPost: null,
  loading: false,
  idPost: null,
  allReverseGeo: [],
  loaderGeo:false
};

const _postReducer = createReducer(
  initialState,

  on(post.gettingGeoOrder, (state) => ({
    ...state,
    loaderGeo: true,
  })),
  on(post.gettingAllPostsOrder, (state) => ({
    ...state,
    loading: true,
  })),

  on(post.gettingAPostsOrder, (state, { id }) => ({
    ...state,
    loading: true,
    idPost: id,
  })),

  on(post.getAllPost, (state, { allPostsRetrieved }) => ({
    ...state,
    allPosts: { ...(state.allPosts = []), ...allPostsRetrieved },
    loading: false,
  })),

  on(post.getAllReverseGeocoding, (state, { allRevGeoRetrieved }) => ({
    ...state,
    allReverseGeo: { ...(state.allReverseGeo = []), ...allRevGeoRetrieved },
    loading: false,
  })),

  on(post.getAPost, (state, { aPostRetrieved }) => ({
    ...state,
    selectedPost: { ...aPostRetrieved },
    loading: false,
  }))
);

export function PostReducer(state, action) {
  return _postReducer(state, action);
}
//exportando el reducer para su uso por las demas dependencias a traves de Reducermap
