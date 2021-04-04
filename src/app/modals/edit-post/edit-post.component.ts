import { environment } from 'src/environments/environment';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GlobalAppState } from 'src/app/globalReducers.reducers';
import { PostModel } from 'src/app/interfaces/interfaces';
import { HttpservicesService } from 'src/app/services/httpservices.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  postFormerData: PostModel[] = [];
  postUpdatedForm: FormGroup;

  constructor(
    private http: HttpservicesService,
    private store: Store<GlobalAppState>,
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postId: number },
    public ngZone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.postUpdatedForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      lat: [, Validators.required],
      long: [, Validators.required],
    });

    if (this.data) {
      this.gettingObjectSelectedById(this.data.postId);
    }
  }

  gettingObjectSelectedById(id) {
    this.store.select('postReducers').subscribe(async (data) => {
      this.postFormerData = await Object.values(data.allPosts).filter((obj) => {
        return obj.id == id;
      });
      console.log(this.postFormerData);
    });
  }

 async  upDatepost() {
    let [{title,content,lat,long},created_at]=await Promise.all([
      this.postUpdatedForm.value,
      this.postFormerData[0].created_at
    ])
    if(!title){
      title=this.postFormerData[0].title
    }
    if(!content){
      content=this.postFormerData[0].content
    }
    if(!lat){
      lat=this.postFormerData[0].lat
    }
    if(!long){
      long=this.postFormerData[0].long
    }

    let updated_at=new Date('2011-11-01').toString();

    let image_url=`${environment.MAPBOX_STATIC_MAP_IMAGE}${lat},${long},8.08,0/300x200?access_token=${environment.MAPBOX_TOKEN}`;
    
    let id=this.data.postId;
    let postToEdit:PostModel={id,title,content,lat,long,image_url,created_at,updated_at};

    this.http.editAPost(this.data.postId.toString(),postToEdit);

    
  }
}
