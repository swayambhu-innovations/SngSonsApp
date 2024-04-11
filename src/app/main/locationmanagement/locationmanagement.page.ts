import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Geolocation } from "@capacitor/geolocation";
import {
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Store } from "@ngrx/store";
import { firstValueFrom, Observable, Subject } from "rxjs";
import { Config } from "src/app/config";
import { NotificationService } from "src/app/utils/notification";
import { LocationService } from "./location.service";
import { Area } from "./area.structure";
import { LocationManagementService } from "./location-management.service";
import { Position } from "@capacitor/geolocation";
import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";
// import { EditInfoPermissionService } from "../edit-info/edit-info.service";

@Component({
  selector: "app-locationmanagement",
  templateUrl: "./locationmanagement.page.html",
  styleUrls: ["./locationmanagement.page.scss"],
})
export class LocationmanagementPage implements OnInit {
  // @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  // @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  constructor(
    private notificationService: NotificationService,
    private modalController: ModalController,
    private platform: Platform,
    private loadingController: LoadingController,
    private locationManagementService: LocationManagementService,
    // private editInfoPermissionService: EditInfoPermissionService
  ) {}

  isMapForm: boolean = false; // checking if ion-modal is open/close
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;
  allAreas: any[] = []; // store all registerd areas fetched from DB
  allEmpsData: any[] = []; // store all registerd users fetched from DB

  // Google Map Variables
  // infoWindow: google.maps.InfoWindow;
  geocoder = new google.maps.Geocoder();
  currentLocation: Subject<Position> = new Subject<Position>(); // Check location for android/ios
  currentPosition: google.maps.LatLngLiteral | undefined; // Default data for google map (but will be fetching realtime location on ngInit)
  zoom = 15; //level of zoom in map
  marker: any;
  //circle around selected location
  mapOptionsCircle: any = {
    fillColor: "rgba(255, 0, 0, 0.5)", // Fill color with alpha (transparency)
    fillOpacity: 0.53,
    clickable: true,
    strokeWeight: 2,
    strokeColor: "rgba(255, 0, 0, 0.9)",
  };
  circleRadius: number = 100; // in meters
  // vertices: google.maps.LatLngLiteral[];

  //geo-fencing variable
  display: any;
  area: google.maps.LatLngLiteral = {
    lat: 26.8381,
    lng: 80.9346001,
  };
  isValidMarker: boolean = false; // check whether in required area

  //added user data for CRUD
  locationForm: FormGroup = new FormGroup({
    locName: new FormControl("", [Validators.required]),
    googleLoc: new FormControl("", [Validators.required]),
    cordinates: new FormControl({
      lat: "",
      lng: "",
    }),
    radius: new FormControl(this.circleRadius, [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(""),
  });

  updateAreaForm: FormGroup = new FormGroup({
    areaID: new FormControl("", [Validators.required]),
  });

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });

    this.loader.present();
    this.getAllAreas();
    // this.getAllEmps();
    this.marker = {
      position: {
        lat: this.currentPosition?.lat,
        lng: this.currentPosition?.lng,
      },
      label: {
        color: "red",
        text: "Selected Location",
      },
      title: "Selected Location",
    };
    this.getCurrLocation();
    this.loader.dismiss();
  }

  // get current location
  async getCurrLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    let loader = await this.loadingController.create({
      message: "Getting location...",
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

  // async getAllEmps() {
  //   const data = await this.editInfoPermissionService.getUsers();
  //   data.docs.map((employee) => {
  //     this.allEmpsData.push({ ...employee.data(), id: employee.id });
  //   });
  // }

  async getAllAreas() {
    this.allAreas = [];
    await this.locationManagementService.getAreas().then((data) =>
      data.docs.map((area) => {
        this.allAreas.push({ ...area.data(), id: area.id });
      })
    );
  }

  async updateEmpArea(areaID: any, emp: any) {
    this.loader.present();
    const data = {
      ...emp,
      areaID: areaID,
    };
    await this.locationManagementService.addAreas(data);
    this.loader.dismiss();
    this.getAllAreas();
  }

  async delArea(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.locationManagementService.deleteArea(this.toDelete.id);
      this.getAllAreas();
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
    }
    this.showConfirm = false;
  }

  async updAreaStatus(event: any, areaID: any, status: boolean) {
    event.stopPropagation();
    this.loader.present();
    await this.locationManagementService.updAreaStatus(areaID, status);
    this.getAllAreas();
    this.loader.dismiss();
  }

  async editDetails(event: any, area: any) {
    event.stopPropagation();
    this.locationForm.setValue(area);
    if (this.locationForm.value.cordinates)
      this.currentPosition = this.locationForm.value.cordinates;
    this.setCircle();
    this.marker.position = this.currentPosition;
    this.isMapForm = true;
  }

  closeModal() {
    this.locationForm.reset();
    this.getCurrLocation();
    this.marker.position = this.currentPosition;
    this.isMapForm = false;
  }

  canDismiss = async () => {
    this.closeModal();
    return true;
  };

  //add location form submit
  async onSubmit() {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      this.notificationService.showError(Config.messages.fillAllFields);
      return;
    }

    this.loader.present();
    const data = {
      ...this.locationForm.value,
      cordinates: {
        // lat: this.currentPosition.lat,
        // lng: this.currentPosition.lng,
      },
    };
    await this.locationManagementService.addAreas(data);
    this.notificationService.showSuccess(
      "Location " + Config.messages.addedSuccessfully
    );
    this.locationForm.reset();
    this.isMapForm = false;
    this.modalController.dismiss();
    this.getAllAreas();
    this.loader.dismiss();
  }
}