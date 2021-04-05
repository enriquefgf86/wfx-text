import { Router } from '@angular/router';
import { GeocodingObject } from './../../interfaces/interfaces';
import { HttpservicesService } from '../../services/httpservices.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { GlobalAppState } from '../../globalReducers.reducers';
import { Store } from '@ngrx/store';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';
import * as postActions from '../../redux/postActions.actions';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css'],
})
export class GraphicsComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: GeocodingObject[] = [];
  byContinents: any[] = [];
  subscriptionRedux: Subscription;
  subscriptio1: Subscription;
  //pie
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  pieChartLabels: Label[] = [];
  pieChartData: any[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];

  //bar
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = ['Latitude', 'Longitude'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];
  barChartData: ChartDataSets[] = [];

  horizontalPosition1: MatSnackBarHorizontalPosition = 'center';
  verticalPosition1: MatSnackBarVerticalPosition = 'top';
  message1: string =
    'Here all referring to charts and its reactive interaction with the reverse geolocation API from BigDataCloud';
  duration1: number = 5000;
  message2: string =
    'This Chart exposes the percentage of data represented on each continent.';
    message3: string =
    'This Bars Chart set for every country retrieve in the data its latitude and longitude';
  duration2: number = 5000;
  action: string = 'Info!!';
  constructor(
    private store: Store<GlobalAppState>,
    private http: HttpservicesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
   this.openSnackBar(
      this.message1,
      this.action,
      this.horizontalPosition1,
      this.verticalPosition1,
      this.duration1,''
    ).afterDismissed().toPromise().then(()=>{
      this.openSnackBarCustom(
        this.message2,
        this.action,
        this.duration2,'custom1'
      ).afterDismissed().toPromise().then(()=>{
        this.openSnackBarCustom(
          this.message3,
          this.action,
          this.duration2,'custom2'
        );
      });
    });

    this.subscriptionRedux = await this.gettingGeo();
    await Promise.all([(this.pieChartData = []), (this.barChartData = [])]);

    const [barData, dataSourceGrouped] = await Promise.all([
      this.objectConformer(Object.values(this.dataSource)),
      this.groupGeoByContinent(Object.values(this.dataSource)),
    ]);

    this.barChartData = barData;
    let byContinents = dataSourceGrouped;
    this.pieChartLabels = Object.keys(byContinents);

    Object.values(byContinents).forEach((element: any[]) => {
      this.pieChartData.push(
        (element.length / Object.values(this.dataSource).length) * 100
      );
    });
  }

  ngAfterViewInit(): void {}
  ngOnDestroy() {
    this.subscriptionRedux.unsubscribe();
  }

  //Proper of Chart
  //=============================================
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  //Proper of Chart
  //=============================================
  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {}

  //getting data fror redux charts
  //=============================================
  async gettingGeo() {
    await this.store.dispatch(postActions.gettingAllPostsOrder());
    return this.store.select('postReducers').subscribe(async (data) => {
      this.dataSource = await data.allReverseGeo;
    });
  }

  //Continents grouping for pie chart
  //=============================================
  groupGeoByContinent(array: GeocodingObject[]) {
    return array.reduce((r, a) => {
      r[a.continent] = r[a.continent] || [];
      r[a.continent].push(a);
      return r;
    }, Object.create(null));
  }

  //object for barChart
  objectConformer(array: GeocodingObject[]) {
    return array.map((element) => {
      return {
        data: [
          Number(element.latitude.toFixed(4)),
          Number(element.longitude.toFixed(4)),
        ],
        label: element.countryName,
      };
    });
  }

  openSnackBar(
    message: string,
    action: string,
    hPosition: MatSnackBarHorizontalPosition,
    vPosition: MatSnackBarVerticalPosition,
    duration: number,
    classCss:string
  ) {
   return this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: hPosition,
      verticalPosition: vPosition,
      panelClass:classCss
    });
  }

  openSnackBarCustom(
    message: string,
    action: string,
    duration: number,
    classCss:string
  ) {
   return this._snackBar.open(message, action, {
      duration: duration,
      panelClass:classCss
    });
  }
}
