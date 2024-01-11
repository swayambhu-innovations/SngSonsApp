import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { LabourMasterService } from './labour-master.service';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';
import { SharedService } from 'src/app/shared/shared.service';
import { FileuploadService } from 'src/app/utils/fileupload';

@Component({
  selector: 'app-labour-master',
  templateUrl: './labour-master.component.html',
  styleUrls: ['./labour-master.component.scss'],
})
export class LabourMasterComponent implements OnInit {
  private file: any;
  isModalOpen: boolean = false; // checking if ion-modal is open/close
  public labourData: any; // Store data of all Labour Parties
  public filteredLabours: any; // Store data of all Labour Parties
  public config = Config; // fetching constant from app config file
  private loader: any;
  public toDelete: any;
  public showConfirm = false;

  constructor(
    private labourMasterService: LabourMasterService,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private modalController: ModalController,
    private sharedService: SharedService,
    private fileuploadService: FileuploadService
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.init();
      }
    });
  }

  labourForm: FormGroup = new FormGroup({
    labourPartyName: new FormControl('', [Validators.required]),
    paymentDispenseLimits: new FormControl('', [Validators.required]),
    paymentAcc: new FormControl(null, [Validators.required]),
    labourProfileImg: new FormControl(),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  paymentMethod: string[] = ['Paytm', 'PhonePe', 'Google Pay', 'Bhim UPI'];

  labourPicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.init();
  }

  get f() {
    return this.labourForm.controls;
  }

  async init() {
    this.loader.present();
    await this.getLabourParty();
    this.loader.dismiss();
  }

  async uploadPic(e: any) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.labourPicSrc = reader.result;
    };
  }

  removePic(): void {
    this.labourPicSrc =
      'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  }

  closeModal = async () => {
    this.labourForm.reset();
    this.removePic();
    this.isModalOpen = false;
    return true;
  };

  async getLabourParty() {
    const data = await this.labourMasterService.getLabourParty();
    this.labourData = data.docs.map((labour) => {
      return { ...labour.data(), id: labour.id };
    });
  }

  async updLabourStatus($event: any, labourId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.labourMasterService.updLabourType(labourId, status);
    await this.getLabourParty();
    this.loader.dismiss();
  }

  searchLabour(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredLabours = this.labourData.filter((item: any) =>
        item.labourPartyName.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.filteredLabours = [];
    }
  }

  async editDetails(event: any, labourParty: any) {
    event.stopPropagation();
    this.labourForm.setValue(labourParty);
    this.labourPicSrc = this.labourForm.value?.labourProfileImg;
    this.isModalOpen = true;
  }

  async deleteLabourParty(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.labourMasterService.deleteLabourParty(this.toDelete.id);
      await this.getLabourParty();
      this.loader.dismiss();
      this.notificationService.showSuccess(
        this.config.messages.deletedSuccessfully
      );
    }
    this.showConfirm = false;
  }

  async onSubmit() {
    if (this.labourForm.invalid) return;

    try {
      this.loader.present();
      if (this.file) {
        const url = await this.fileuploadService.uploadFile(this.file);
        this.labourForm.patchValue({ labourProfileImg: url as string });
      }

      await this.labourMasterService.addLabourParty(this.labourForm.value);

      this.labourForm.reset();
      this.removePic();
      await this.getLabourParty();
      if (this.labourForm.controls['id'].value == '')
        this.notificationService.showSuccess(
          this.config.messages.addedSuccessfully
        );
      else
        this.notificationService.showSuccess(
          this.config.messages.updatedSuccessfully
        );
      // this.loader.dismiss();
      this.isModalOpen = false;
      this.modalController.dismiss();
    } catch (error) {
      console.log(error);
      this.notificationService.showError('Something Went Wrong');
      return;
    }
  }
}
