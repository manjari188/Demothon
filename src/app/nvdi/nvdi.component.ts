import { Component, OnInit } from '@angular/core';
import { EsriLoaderService } from 'angular-esri-loader';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-nvdi',
  templateUrl: './nvdi.component.html',
  styleUrls: ['./nvdi.component.css']
})
export class NvdiComponent implements OnInit {

  map: any;
  layer: any;
  gs: any;
  showModal: boolean=false;
  swiper:any;
  constructor(private esriLoader: EsriLoaderService, private modalService: NgbModal) { }

  ngOnInit() {
    let modelVar = this.modalService;
    this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: 'https://js.arcgis.com/3.28/'
    }).then(loadMap.bind(this));

function loadMap(){
      this.esriLoader.loadModules([
        'esri/map',
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISImageServiceLayer",
        "esri/layers/ImageServiceParameters",
        "esri/request",
        "esri/geometry/projection",
        "esri/geometry/Point",
        "esri/SpatialReference",
        "esri/tasks/GeometryService",
        "esri/tasks/ProjectParameters",
        "dojo/_base/lang",
        "dojo/promise/all",
        "esri/geometry/webMercatorUtils",
        "esri/dijit/LayerSwipe",
        "esri/layers/FeatureLayer"
      ]).then(modulesEsri.bind(this));
      function modulesEsri([
        Map,
        ArcGISDynamicMapServiceLayer,
        ArcGISImageServiceLayer,
        ImageServiceParameters,
        esriRequest,
        projection,
        Point,
        SpatialReference,
        GeometryService,
        ProjectParameters,
        lang,
        all,
        webMercatorUtils,
        LayerSwipe,
        FeatureLayer
      ])  {
        this.map = new Map('mapNode', {
          center: [85.82,20.2961],
          zoom: 8,
          basemap: "topo"
        });
        this.gs = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
        var params = new ImageServiceParameters();
        params.noData = 0;
        var imageServiceLayer = new ArcGISImageServiceLayer("https://esriindia.niit-tech.in/arcserver/rest/services/DemoAthonSaswat/NDVI15273_ClipClassify1/ImageServer", {
          imageServiceParameters: params,
          opacity: 0.75
        });
        var mlayer = new FeatureLayer("https://esriindia.niit-tech.in/arcserver/rest/services/DemoAthonSaswat/NDVI_CLASSIFICATION_Image/MapServer/0");
        this.map.addLayer(mlayer);
        imageServiceLayer.on("load", function () {
          let rasterAtt = imageServiceLayer.getRasterAttributeTable();
          console.log(rasterAtt);

        })
       this.swiper = new LayerSwipe({
          type: "vertical",  //Try switching to "scope" or "horizontal"
          map: this.map,
         // layers: [swipeLayer]
        }, "swipeDiv");
        
        this.map.on("click", lang.hitch(this,function (evt) {
          var point = evt.mapPoint;
          var outSpatialReference = new SpatialReference({
            wkid: 4326 //Sphere_Sinusoidal
          });
          var normalizedVal = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y);
          console.log(normalizedVal); 
          // evt.mapPoint.x= normalizedVal[0];
          // evt.mapPoint.y= normalizedVal[1];
          var params = new ProjectParameters();
          params.geometries = [point];
          params.outSR = outSpatialReference;
          //params.transformation = transformation;
          this.gs.project(params,function(evt)
          {
            console.log(evt);
            var arr=[];
            var layersRequest1 = esriRequest({
              url: 'https://esriindia.niit-tech.in/arcserver/rest/services/DemoAthonSaswat/NDVI15273_ClipClassify1/ImageServer/identify?geometry={"x":' + evt[0].x + ',"y":' + evt[0].y + '}&geometryType=esriGeometryPoint&mosaicRule=&pixelSize=0.5,0.5&f=pjson',
              content: { f: "json" },
              handleAs: "json",
              callbackParamName: "callback"
            });
            arr.push(layersRequest1);
            var layersRequest2 = esriRequest({
              url: 'https://esriindia.niit-tech.in/arcserver/rest/services/DemoAthonSaswat/NDVI15289_ClipClassify1/ImageServer/identify?geometry={"x":' + evt[0].x + ',"y":' + evt[0].y + '}&geometryType=esriGeometryPoint&mosaicRule=&pixelSize=0.5,0.5&f=pjson',
              content: { f: "json" },
              handleAs: "json",
              callbackParamName: "callback"
            });
            arr.push(layersRequest2);
            all(arr).then(function(results){
              // results will be an Array
              console.log("Success: ", results);
            });
            // layersRequest.then(
            //   function (response) {
            //     console.log("Success: ", response);
            //   }, function (error) {
            //     console.log("Error: ", error.message);
            //   });
          },function(err){
            console.log(err);
          });

        }))
      }
    }

  }
  onClickSwipe(){
  if(this.showModal){
    this.showModal=false;
  }
  else{
    this.showModal=true;
  }
  }

  showSlidr(){
    debugger;
    this.swiper.startup();
  }
  
}

