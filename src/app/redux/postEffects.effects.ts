import { HttpservicesService } from './../services/httpservices.service';
import { MapService } from './../services/map-services.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as postActions from '../redux/postActions.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class PostEffects {
  constructor(
    private actionObservable$: Actions,
    private mapeService: MapService,
    private httpService: HttpservicesService
  ) {}

  @Effect({ dispatch: true })
  getAllPostsEffect = this.actionObservable$.pipe(
    ofType(postActions.gettingAllPostsOrder),
    mergeMap(() => this.httpService.getAllCurrentPosts().pipe(map(posts=>

      postActions.getAllPost({allPostsRetrieved:posts})
    ))
    )
  );



  @Effect({ dispatch: false })
  createAPostsEffect = this.actionObservable$.pipe(
    ofType(postActions.createAPost),
    mergeMap((post) => this.httpService.createAPost(post.aPostCreated)
    )
  );
}
