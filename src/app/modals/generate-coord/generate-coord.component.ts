import { createAPost } from './../../redux/postActions.actions';
import { environment } from './../../../environments/environment';
import { HttpservicesService } from './../../services/httpservices.service';
import { PostModel } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { GlobalAppState } from 'src/app/globalReducers.reducers';
import * as postActions from '../../redux/postActions.actions';

const imageStaticMapApi = environment.MAPBOX_STATIC_MAP_IMAGE;

@Component({
  selector: 'app-generate-coord',
  templateUrl: './generate-coord.component.html',
  styleUrls: ['./generate-coord.component.css'],
})
export class GenerateCoordComponent implements OnInit {
  coordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<GlobalAppState>
  ) {}

  ngOnInit(): void {
    this.coordForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      lat: [, Validators.required],
      long: [, Validators.required],
    });

    console.log(imageStaticMapApi);
  }

  async createCoord() {
    //triggering in all promises some neccesary variables for the process
    const [
      { title, content, lat, long },

      v4options,
      created_at,
      updated_at,
    ] = await Promise.all([
      this.coordForm.value,

      {
        node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        clockseq: 0x1234,
        msecs: new Date('2011-11-01').getTime(),
        nsecs: 5678,
      },
      new Date('2011-11-01').toString(),
      new Date('2011-11-01').toString(),
    ]);

    let image_url = `${imageStaticMapApi}${lat},${long},8.08,0/300x200?access_token=${environment.MAPBOX_TOKEN}`;

    let id = uuidv4(v4options);

    console.log(image_url);

    //building the object to send for post creation
    let createdPost: PostModel = {
      id,
      title,
      content,
      lat,
      long,
      image_url,
      created_at,
      updated_at,
    };

    console.log(createdPost);

    //Effect instead of calling the service
    this.store.dispatch(postActions.createAPost({ aPostCreated: createdPost }));
  }
}
