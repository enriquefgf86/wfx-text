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
import *as postActions from  '../../redux/postActions.actions'

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css'],
})
export class GraphicsComponent implements OnInit, AfterViewInit,OnDestroy {
  dataSource: GeocodingObject[] = [];
  byContinents: any[] = [];
  subscriptionRedux:Subscription;
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

  constructor(
    private store: Store<GlobalAppState>,
    private http: HttpservicesService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.subscriptionRedux=await this.gettingGeo();
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
  ngOnDestroy(){
this.subscriptionRedux.unsubscribe()

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
  async  gettingGeo() {
   await  this.store.dispatch(postActions.gettingAllPostsOrder())
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
}
