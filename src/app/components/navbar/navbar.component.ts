import { PageRouting } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  showSide=true

  pages: PageRouting[] = [
    // {
    //   route: '/pages/page1',
    //   icon: '../../../assets/home.svg',
    //   title: 'Home',
    // },
    // {
    //   route: '/pages/page2',
    //   icon: '../../../assets/tables.svg',
    //   title: 'Tables',
    // },
    // {
    //   route: '/pages/page3',
    //   icon: '../../../assets/graphics.svg',
    //   title: 'Charts',
    // },

    // // {
    // //   route: '/pages/page4',
    // //   icon: '../../../assets/map.svg',
    // //   title: 'Maps',
    // // },
  ];

  constructor(private router:Router,    private location: Location,
    ) {}

 async ngOnInit() {

   await  this.navbarSelecter()
  }

    //NavBar filter
  //=============================================
 async navbarSelecter(){
   let pages: PageRouting[] =await  [
      {        route: '/pages/page1',
        icon: '../../../assets/home.svg',
      view:true,
        title: 'Home',
      },
      {
        route: '/pages/page2',
        icon: '../../../assets/tables.svg',
      view:true,
        title: 'Tables',
      },
      {
        route: '/pages/page3',
        icon: '../../../assets/graphics.svg',
      view:true,
        title: 'Charts',
      },
    ];
    this.pages=await []

    pages.forEach(element => {
      if(element.route!=this.location.path()){
        this.pages.push(element)
      }
    });
     return this.pages

  }
}
