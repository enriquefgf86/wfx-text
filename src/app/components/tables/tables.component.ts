import { EditPostComponent } from './../../modals/edit-post/edit-post.component';
import { HttpservicesService } from './../../services/httpservices.service';
import { PostModel, PostModelCollapsable } from './../../interfaces/interfaces';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalAppState } from '../../globalReducers.reducers';
import { MatDialog } from '@angular/material/dialog';
import * as postActions from '../../redux/postActions.actions';
import { Subscription } from 'rxjs';
import { GenerateCoordComponent } from '../../modals/generate-coord/generate-coord.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: PostModel[] = [];
  collapsable: PostModelCollapsable[] = [];
  headers = ['Title', 'Description', 'Actions'];

  headersCollapse = [
    'Preview',
    '',
    'Lat/Long',
    // 'Description',
  ];
  expandedElement: PostModel | null;

  columns = [
    { name: 'Title' },
    { name: 'Content' },
    { name: 'Creation Date' },
    { name: 'Lat' },
    { name: 'Long' },
    { name: 'Updated' },
    { name: 'Image' },
  ];

  page = 1;
  pageSize = 2;
  collectionSize = this.dataSource.length;
  countries: PostModel[];

  suscriber: Subscription;
  suscriber2: Subscription;
  constructor(
    private http: HttpservicesService,
    private route: Router,
    private store: Store<GlobalAppState>,
    public dialog: MatDialog
  ) {
    this.refreshCountries();
  }

  ngOnInit() {
    //Effect in order to get all posts
    this.store.dispatch(postActions.gettingAllPostsOrder());
  }

  ngAfterViewInit() {
    this.suscriber = this.getAllPosts();
    this.http.getAllReverseGeocodings();
    setTimeout(() => {
      this.refreshCountries();
    }, 1000);
  }

  ngOnDestroy() {
    this.suscriber.unsubscribe();
  }

  //getting all post from redux
  //=============================================================
  getAllPosts() {
    return this.store.select('postReducers').subscribe(async (data) => {
      if (data) {
        this.dataSource = await Object.values(data.allPosts);
        let dataSource = await Object.values(data.allPosts);

        this.collectionSize = this.dataSource.length;
        // console.log(this.dataSource);
        // console.log(this.dataSource.length);

        this.collapsable = dataSource.map((obj) => ({
          ...obj,
          expanded: false,
        }));

        // console.log(this.collapsable);
      }
    });
  }

  //table pages paginator logic
  //=============================================================
  refreshCountries() {
    return (this.countries = this.collapsable
      .map((country, i) => ({ counter: i + 1, expanded: false, ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      ));
  }

  //table expansion helper
  //=============================================================
  expand(data) {
    return this.dataSource.filter((x) => x.id === data.id);
  }

  //deleting event
  //=============================================================
  delete(event) {
    if (event.target.id) {
      this.http.deleteAPost(event.target.id);
    }
  }
  //open modla passing id as flag
  //=============================================================
  openEditPost(event) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: { postId: event.target.id },
    });
  }

  //open post editor/create modal
  //=============================================================
  openCreateCoord() {
    const dialogRef = this.dialog.open(GenerateCoordComponent);
  }
}
