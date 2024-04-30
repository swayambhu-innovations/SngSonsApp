import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { NotificationService } from 'src/app/utils/notification';
import { FileuploadService } from 'src/app/utils/fileupload';
import { LocationManagementService } from 'src/app/main/locationmanagement/location-management.service';
import { UtilService } from 'src/app/utils/util';
import { AddEmployeeService } from './service/add-employee.service';
import { Config } from 'src/app/config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private fileuploadService: FileuploadService,
    private locationManagementService: LocationManagementService,
    private utilService: UtilService,
    private AddEmployeeService: AddEmployeeService,
    private route: ActivatedRoute,


  ) {}

  employeeForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    roleName: new FormControl(''),
    roleId: new FormControl('', [Validators.required]),
    customID: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    dob: new FormControl(new Date(), []),
    gender: new FormControl('', [Validators.required]),
    areaID: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    aadhar: new FormControl('', [Validators.required]),
    pan: new FormControl('', [Validators.required]),
    doj: new FormControl(new Date(), []),
    salary: new FormControl(''),
    photoURL: new FormControl(Config.url.defaultProfile),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
    bloodGroup: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    pastDisease: new FormControl(''),
    allergy: new FormControl(''),
  });

  dob: Date = moment(new Date()).startOf('month').toDate();
  doj: Date = moment(new Date()).startOf('month').toDate();
  private loader: any;
  empData: any;
  allAreas: any[] = [];
  userData: any;
  customID: { [key: string]: { present: boolean } } = {};
  phoneNumber: { [key: string]: { present: boolean } } = {};
  ifPhoneValid: boolean = false;
  ifIDValid: boolean = false;
  public rolesList: any[] = [];
  public roleMapping: any = {};
  editUserData:any;
  title:string='Add Employee'

  async ngOnInit() {
    this.getUsersList();
    this.getRoles()

    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    const data: any = this.utilService.getUserdata();
    this.userData = data?.access;

    this.getallAreas();

    if (history.state.employee) {
      this.empData = JSON.parse(history.state.employee);
      this.empData && this.employeeForm.patchValue({ ...this.empData });
    }
    
    this.route.queryParams.subscribe((params) => {
      if (params && params?.["userId"]) {
        this.title='Edit Employee'
        this.AddEmployeeService.getuserData(
          params?.["userId"]
        ).then((data: any) => {
          
          this.editUserData = data.data();
          this.employeeForm.setValue( {
            userName: this.editUserData.userName,
          roleName: this.editUserData.roleName,
          customID:this.editUserData.customID,
          email: this.editUserData.email,
          phone: this.editUserData.phone,
          dob: this.editUserData.dob,
          gender: this.editUserData.gender,
          areaID: this.editUserData.areaID,
          address: this.editUserData.address,
          aadhar: this.editUserData.aadhar,
          pan: this.editUserData.pan,
          doj: this.editUserData.doj,
          salary: this.editUserData.salary,
          photoURL: this.editUserData.photoURL,
          active: this.editUserData.active,
          createdAt: this.editUserData.createdAt,
          id: data.id,
          bloodGroup: this.editUserData.bloodGroup,
          weight: this.editUserData.weight,
          height:this.editUserData.height,
          pastDisease: this.editUserData.pastDisease,
          allergy:this.editUserData.allergy,
          roleId:this.editUserData.roleId,
        });
        });
        
      }
      
    });
  }

  
async getRoles() {
  const data = await this.AddEmployeeService.getRoles();
  this.rolesList = data.docs.map((role) => {
      this.roleMapping[role.id] = role.data();
      return { ...role.data(), id: role.id }
  });
}


  async getUsersList() {
    try {
      const response = await this.AddEmployeeService.getUsersList();
      response.docs.forEach((data: any) => {
        this.customID[data.data().customID] = {
          present: true,
        };
        this.phoneNumber[data.id] = {
          present: true,
        };
      });
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }

  phoneValidation() {
    let currPhone = this.employeeForm.value.phone;

    if (this.phoneNumber.hasOwnProperty(this.employeeForm.value.phone)) {
      this.ifPhoneValid = true;
    } else {
      this.ifPhoneValid = false;
    }
  }

  customIdValidation() {
    let customID = this.employeeForm.value.phone;

    if (this.customID.hasOwnProperty(this.employeeForm.value.customID)) {
      this.ifIDValid = true;
    } else {
      this.ifIDValid = false;
    }
  }

  updateDob(e: any) {
    this.dob = moment(e.target.value).toDate();
    this.employeeForm.patchValue({
      dob: this.dob,
    });
  }

  updatedDoj(e: any) {
    this.doj = moment(e.target.value).toDate();
    this.employeeForm.patchValue({
      doj: this.doj,
    });
  }

  async getallAreas() {
    this.allAreas = [];
    await this.locationManagementService.getAreas().then((data) =>
      data.docs.map((area) => {
        this.allAreas.push({ ...area.data(), id: area.id });
      })
    );
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  async changePhoto(e: any) {
    this.loader.present();
    const file = e.target.files[0];
    const url = await this.fileuploadService.uploadFile(
      file,
      Config.storage.userPhoto,
      `${this.employeeForm.value.phone}.${file.name.split('.').pop()}`
    );
    this.employeeForm.patchValue({
      photoURL: url,
    });
    this.loader.dismiss();
  }

  removePhoto(): void {
    this.employeeForm.patchValue({
      photoURL: Config.url.defaultProfile,
    });
  }

  goback() {
    this.navCtrl.back();
  }

  async onSubmit() {
    if (this.employeeForm.invalid || this.ifIDValid || this.ifPhoneValid) {
      this.employeeForm.markAllAsTouched();
      this.notificationService.showError(Config.messages.fillAllFields);
      return;
    }
    this.loader.present();
    try {
      for(let i=0;i<this.rolesList.length;i++){
        if(this.employeeForm.value.roleId==this.rolesList[i].id){
          this.employeeForm.patchValue({roleName:this.rolesList[i].roleName,roleId:this.rolesList[0].id})
          await this.AddEmployeeService.addUser({...this.employeeForm.value,access:this.rolesList[i].access});
        }
      }

      this.notificationService.showSuccess(
        'New Employee ' + Config.messages.addedSuccessfully
      );
    } catch (err) {
      this.notificationService.showError(Config.messages.errorOccurred);
    }
    this.employeeForm.reset();
    this.loader.dismiss();
    this.goback();
  }
}
