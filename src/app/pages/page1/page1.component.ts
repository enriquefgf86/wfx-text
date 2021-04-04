import { HttpservicesService } from './../../services/httpservices.service';
import { MapService } from './../../services/map-services.service';
import { GenerateCoordComponent } from './../../modals/generate-coord/generate-coord.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GlobalAppState } from 'src/app/globalReducers.reducers';
import * as postActions from '../../redux/postActions.actions'


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit ,AfterViewInit{

  panelOpenStateHome:boolean=false
  constructor(
    public dialog: MatDialog,
    public mapService: MapService,
    private http: HttpservicesService,
    private store: Store<GlobalAppState>,

  ) {}

  ngOnInit(): void {
        //Effect in order to get all posts
        this.store.dispatch(postActions.gettingAllPostsOrder())
        console.log(this.panelOpenStateHome);
        

  }

  ngAfterViewInit() {
    this.http.getAllReverseGeocodings()
  }

  openCreateCoord() {
    const dialogRef = this.dialog.open(GenerateCoordComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  clickOpen(){
    this.panelOpenStateHome=!this.panelOpenStateHome

    console.log(this.panelOpenStateHome);
    
  }
}
