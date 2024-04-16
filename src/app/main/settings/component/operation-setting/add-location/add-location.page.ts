import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationService } from '../operation.service';
import { NotificationService } from 'src/app/utils/notification';
import { LoadingController, NavController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  constructor(
    private operationService: OperationService,
    private notificationService: NotificationService,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  // Google Map Variables
  infoWindow: google.maps.InfoWindow;
  geocoder = new google.maps.Geocoder();
  currentLocation: Subject<Position> = new Subject<Position>(); // Check location for android/ios
  currentPosition: google.maps.LatLngLiteral; // Default data for google map (but will be fetching realtime location on ngInit)
  zoom = 15; //level of zoom in map
  marker: any;
  //circle around selected location
  mapOptionsCircle: any = {
    fillColor: 'rgba(255, 0, 0, 0.5)', // Fill color with alpha (transparency)
    fillOpacity: 0.53,
    clickable: true,
    strokeWeight: 2,
    strokeColor: 'rgba(255, 0, 0, 0.9)',
  };
  circleRadius: number = 100; // in meters
  vertices: google.maps.LatLngLiteral[];

  //geo-fencing variable
  display: any;
  area: google.maps.LatLngLiteral = {
    lat: 26.8381,
    lng: 80.9346001,
  };
  isValidMarker: boolean = false; // check whether in required area
  private loader: any;

  //added user data for CRUD
  locationForm: FormGroup = new FormGroup({
    locName: new FormControl('', [Validators.required]),
    googleLoc: new FormControl('', [Validators.required]),
    cordinates: new FormControl({
      lat: '',
      lng: '',
    }),
    radius: new FormControl(this.circleRadius, [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  ngOnInit() {
    this.marker = {
      position: {
        lat: this.currentPosition?.lat,
        lng: this.currentPosition?.lng,
      },
      label: {
        color: 'red',
        text: 'Selected Location',
      },
      title: 'Selected Location',
    };
    this.getCurrLocation();

    if (history.state.area) {
      this.area = JSON.parse(history.state.area);
      this.locationForm.setValue(this.area);
      if (this.locationForm.value.cordinates)
        this.currentPosition = this.locationForm.value.cordinates;
      this.setCircle();
      this.marker.position = this.currentPosition;
    }
  }

  // get current location
  async getCurrLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    let loader = await this.loadingController.create({
      message: 'Getting location...',
    });
    loader.present();
    this.currentPosition = {
      lat: coordinates?.coords.latitude, //here
      lng: coordinates?.coords.longitude, //here
    };
    this.marker.position = this.currentPosition;
    this.getLoactionByCordinates(this.currentPosition);
    // if (this.platform.is("capacitor")) {
    //   this.currentPosition = {
    //     lat: coordinates.coords.latitude, //here
    //     lng: coordinates.coords.longitude, //here
    //   };
    //   this.marker.position = this.currentPosition;
    //   this.getLoactionByCordinates(this.currentPosition);
    //   // await firstValueFrom(this.currentLocation).then((position: any) => {

    //   // });
    // } else
    //   navigator.geolocation.getCurrentPosition(
    //     (position: GeolocationPosition) => {
    //       this.currentPosition = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };
    //       this.marker.position = this.currentPosition;
    //       this.getLoactionByCordinates(this.currentPosition);
    //     },
    //     (error) => {
    //       this.getCurrLocation();
    //     }
    //   );
    loader.dismiss();
  }

  // get cordinates of location searched
  async getCordinates(request: google.maps.GeocoderRequest) {
    this.geocoder.geocode(request).then((res) => {
      const { results } = res;
      const position = results[0].geometry.location.toJSON();

      this.currentPosition = {
        lat: position.lat,
        lng: position.lng,
      };
    });
  }

  // search for location name by cordinates
  async getLoactionByCordinates(cordinates: any) {
    this.geocoder.geocode({ location: cordinates }).then((res) => {
      if (res.results[0]) {
        this.circleRadius = 100;
        this.locationForm.patchValue({
          googleLoc: res.results[0].formatted_address,
          radius: this.circleRadius,
        });
      }
    });
  }

  // set area circle of selected area
  async setCircle(rad: any = this.locationForm.value.radius) {
    this.circleRadius = parseInt(rad);
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.currentPosition = event.latLng.toJSON();
      this.setCircle();
      this.marker.position = this.currentPosition;
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  newPosition(event: any) {
    this.currentPosition = event.latLng.toJSON();
  }
  //add location form submit
  async onSubmit() {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      this.notificationService.showError(Config.messages.fillAllFields);
      return;
    }

    this.loader?.present();
    const data = {
      ...this.locationForm.value,
      cordinates: {
        lat: this.currentPosition.lat,
        lng: this.currentPosition.lng,
      },
    };
    await this.operationService.addAreas(data);
    this.notificationService.showSuccess(
      'Location ' + Config.messages.addedSuccessfully
    );
    this.locationForm.reset();
    this.loader.dismiss();
  }

  goBack() {
    this.navCtrl.back();
  }
}