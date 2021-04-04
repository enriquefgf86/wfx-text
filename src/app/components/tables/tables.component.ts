import { EditPostComponent } from './../../modals/edit-post/edit-post.component';
import { HttpservicesService } from './../../services/httpservices.service';
import { PostModel, PostModelCollapsable } from './../../interfaces/interfaces';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalAppState } from 'src/app/globalReducers.reducers';
import { MatDialog } from '@angular/material/dialog';
import * as postActions from '../../redux/postActions.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit, AfterViewInit,OnDestroy {
  dataSource: PostModel[] = [];
  collapsable: PostModelCollapsable[] = [];
  headers = [
    'Title',
    'Description',
    'Actions',
  ];

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

  suscriber:Subscription;
  suscriber2:Subscription;
  constructor(
    private http: HttpservicesService,
    private route: Router,
    private store: Store<GlobalAppState>, public dialog: MatDialog,

  ) {}

  ngOnInit() {
    //Effect in order to get all posts
    this.store.dispatch(postActions.gettingAllPostsOrder())
  }

  ngAfterViewInit() {
    this.suscriber=this.getAllPosts();
    this.http.getAllReverseGeocodings()
  }

  ngOnDestroy(){}

  //accessing redux to get all posts to populate table
  getAllPosts() {
    return this.store.select('postReducers').subscribe(async (data) => {
      if (data) {
        this.dataSource = await Object.values(data.allPosts);
        let dataSource = await Object.values(data.allPosts);

        this.collapsable = dataSource.map((obj) => ({
          ...obj,
          expanded: false,
        }));
      }
    });
  }

  expand(data) {
    return this.dataSource.filter((x) => x.id === data.id);
  }

  delete(event) {
    console.log(event.target.id);
    if (event.target.id) {
      this.http.deleteAPost(event.target.id);
    }
  }

  edit(event){
    console.log(event.target.id);

  }

  openEditPost(event) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: { postId: event.target.id },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
