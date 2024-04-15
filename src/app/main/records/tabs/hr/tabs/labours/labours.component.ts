import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { LabourMasterService } from 'src/app/main/settings/component/labour-master/labour-master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { FileuploadService } from 'src/app/utils/fileupload';
import { NotificationService } from 'src/app/utils/notification';

@Component({
  selector: 'app-labours',
  templateUrl: './labours.component.html',
  styleUrls: ['./labours.component.scss'],
})
export class LaboursComponent implements OnInit {
  private file: any;
  isModalOpen: boolean = false; // checking if ion-modal is open/close
  public labourData: any; // Store data of all Labour Parties
  public filteredLabours: any; // Store data of all Labour Parties
  public config = Config; // fetching constant from app config file
  private loader: any;
  public toDelete: any;
  public showConfirm = false;
  public isSearching: boolean = false; // tells whether user is searching or not

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

  labourPicSrc: any = Config.url.defaultProfile;

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
    this.loader?.present();
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
    this.labourPicSrc = Config.url.defaultProfile;
  }

  closeModal() {
    this.labourForm.reset();
    this.removePic();
    this.isModalOpen = false;
  }

  canDismiss = async () => {
    this.closeModal();
    return true;
  };

  async getLabourParty() {
    const data = await this.labourMasterService.getLabourParty();
    this.labourData = data.docs.map((labour) => {
      return { ...labour.data(), id: labour.id };
    });
    this.filteredLabours = this.labourData;
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
      this.filteredLabours = this.labourData.filter((labour: any) =>
        labour.labourPartyName.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else this.filteredLabours = this.labourData;
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
    if (this.labourForm.invalid) {
      this.labourForm.markAllAsTouched();
      return;
    }

    try {
      this.loader.present();
      if (this.file) {
        const url = await this.fileuploadService.uploadFile(this.file);
        this.labourForm.patchValue({ labourProfileImg: url as string });
      } else
        this.labourForm.patchValue({ labourProfileImg: this.labourPicSrc });

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
      this.isModalOpen = false;
      this.modalController.dismiss();
      this.loader.dismiss();
    } catch (error) {
      console.log(error);
      this.notificationService.showError('Something Went Wrong');
      return;
    }
  }
}
