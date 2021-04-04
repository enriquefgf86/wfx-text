import { PostModel, GeocodingObject } from './../interfaces/interfaces';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as postActions from '../redux/postActions.actions';
import { Store } from '@ngrx/store';
import { GlobalAppState } from '../globalReducers.reducers';

const api = environment.API_WEFOX;
const reverseGeoCodingApi = environment.REVERSE_GEOCODING;
const reverseGeoCodingApiKey = environment.REVERSE_GEO_API_KEY;

const headers = {
  'Content-Type': 'application/json',
};

const headersGeo = {
  Acept: 'application/json',
};
@Injectable({
  providedIn: 'root',
})
export class HttpservicesService {
  allGeoCoordinates: GeocodingObject[] = [];

  constructor(private http: HttpClient, private store: Store<GlobalAppState>) {}

  //getting all posts
  getAllCurrentPosts() {
    return this.http.get<PostModel[]>(api, { headers: headers });
  }

  //creating a post
  async createAPost(postObject: PostModel) {
    const body = await JSON.stringify(postObject);
    this.http
      .post<PostModel>(api, body, { headers: headers })
      .toPromise()
      .then((log) => {
        console.log(log);
        this.store.dispatch(postActions.gettingAllPostsOrder());
      });
  }

  //deleting post
  async deleteAPost(postObjectId: string) {
    return this.http
      .delete(`${api}/${postObjectId}`, { headers: headers })
      .toPromise()
      .then((log) => {
        console.log(log);
        this.store.dispatch(postActions.gettingAllPostsOrder());
      });
  }

  //editing post
  async editAPost(postId: string, postObject: PostModel) {
    const body = JSON.stringify(postObject);

    this.http
      .put<PostModel>(`${api}/${postId}`, body, { headers: headers })
      .toPromise()
      .then((log) => {
        console.log(log);
        this.store.dispatch(postActions.gettingAllPostsOrder());
      });
  }

  //get post by id
  getAPost(postId: string) {
    return this.http.get<PostModel>(`${api}/${postId}`, { headers: headers });
  }

  //getting reverse geocoding for places
  async getAllReverseGeocodings() {
    let array = await [];

     this.store.select('postReducers').subscribe(async (data) => {
       Object.values(data.allPosts).forEach((post) => {
        this.http
          .get<GeocodingObject>(
            `${reverseGeoCodingApi}latitude=${post.lat}&longitude=${post.long}&localityLanguage=en&key=${reverseGeoCodingApiKey}`,
            { headers: headersGeo }
          )
          .toPromise()
          .then((result) => {
            array.push(result);
          //  this.repeatedObjectsCleaner(array)
            
          });
      });
    });
    setTimeout(async() => {
      console.log(array);
      await this.repeatedObjectsCleaner(array)
    }, 1000);
  }

  //setting in redux array of unique objects fucntion 
  repeatedObjectsCleaner(array:GeocodingObject[]){
   let x= array.reduce((unique,comparator)=>{
      if(!unique.some(obj=>obj.latitude===comparator.latitude&&obj.longitude===comparator.longitude)){
        unique.push(comparator)
      }
      return unique;
    },[])

    this.store.dispatch(
        postActions.getAllReverseGeocoding({
          allRevGeoRetrieved:x,
        })
      );
  }
}
