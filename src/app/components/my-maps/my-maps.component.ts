import { HttpservicesService } from '../../services/httpservices.service';
import { MapService } from './../../services/map-services.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { GlobalAppState } from '../../globalReducers.reducers';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

declare var mapboxgl: any;
@Component({
  selector: 'app-my-maps',
  templateUrl: './my-maps.component.html',
  styleUrls: ['./my-maps.component.css'],
})
export class MyMapsComponent implements OnInit, AfterViewInit {
  lat: any;
  lng: any;
  panelOpenState1 = false;
  panelOpenState = false;

  message5: string =
    'Map tridimensional provided by Mapbox API';
  message6: string =
    'In this map you could write your own coordinates and just  move to that point , despite of being initialized with the position specified for the city of your selection';
  duration3: number = 8000;

  action: string = 'Info!!';

  constructor(
    public service: MapService,
    private routerSnap: ActivatedRoute,
    private http: HttpservicesService,
    private store: Store<GlobalAppState>,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    let id = await this.routerSnap.snapshot.params['id']; //obtainig route of url param

    this.getSelectedPost(id);
  }

  ngAfterViewInit() {
    this.openSnackBarCustom(this.message5,this.action,this.duration3,'custom3').afterDismissed().toPromise().then(()=>{
      this.openSnackBarCustom(this.message6,this.action,this.duration3,'custom4')
    })
  }

  //Calling map corresponding with the selected  post
  //=============================================
  getSelectedPost(id) {
    this.http
      .getAPost(id)
      .toPromise()
      .then(async (result: PostModel) => {
        const [lat, lng] = await Promise.all([result.lat, result.long]);
        // console.log(result);
        this.lat = lat;
        this.lng = lng;
        //triggering maps 1 and 2
        this.service.mapTrigger(this.lat, this.lng);
        this.service.mapTrigger1(this.lat, this.lng);
      });
  }

  openSnackBarCustom(
    message: string,
    action: string,
    duration: number,
    classCss: string
  ) {
    return this._snackBar.open(message, action, {
      duration: duration,
      panelClass: classCss,
    });
  }
}
