import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { LabourMasterService } from './labour-master.service';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';

@Component({
  selector: 'app-labour-master',
  templateUrl: './labour-master.component.html',
  styleUrls: ['./labour-master.component.scss'],
})
export class LabourMasterComponent implements OnInit {
  labourForm!: FormGroup;
  presentingElement: any = '' || null;
  file: any;
  isModalOpen: boolean = false; // checking if ion-modal is open/close
  public labourData: any; // Store data of all Labour Parties
  public labourPartyID = ''; // to stotre ID of labor-party selected
  public config = Config; // fetching constant from app config file
  public memberData: any;

  constructor(
    private formBuilder: FormBuilder,
    private labourMasterService: LabourMasterService,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private modalController: ModalController
  ) {}

  paymentMethod: string[] = ['Paytm', 'PhonePe', 'Google Pay', 'Bhim UPI'];

  labourPicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';

  async ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    let loader = await this.loadingController.create({
      message: 'Please wait...',
    });
    loader.present();
    await this.getLabourParty(this.config.labourMasterVariable.labourMaster);
    this.labourForm = this.formBuilder.group({
      labourPartyName: new FormControl('', [Validators.required]),
      paymentDispenseLimits: new FormControl('', [Validators.required]),
      paymentAcc: new FormControl(null, [Validators.required]),
      labourProfileImg: new FormControl('', []),
      active: new FormControl(true, []),
      createdAt: new FormControl(new Date(), []),
    });
    loader.dismiss();
  }

  get f() {
    return this.labourForm.controls;
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

  closeModal() {
    this.labourForm.reset();
    this.removePic();
    this.isModalOpen = false;
    this.modalController.dismiss();
  }

  async getLabourParty(collectionID: string) {
    const data = await this.labourMasterService.getLabourParty(collectionID);
    this.labourData = data.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
  }

  async editDetails(event: any, labourPartyId: string) {
    event.stopPropagation();
    this.isModalOpen = true;
    this.labourPartyID = labourPartyId;
    this.memberData = await this.labourMasterService.editLabourParty(
      labourPartyId
    );
  }

  async deleteLabourParty(labourPartyId: string) {
    await this.labourMasterService
      .deleteLabourParty(labourPartyId)
      .then((res) => {
        this.notificationService.showSuccess(
          this.config.messages.deletedSuccessfully
        );
      })
      .catch((err) => {
        console.log(err);
        this.notificationService.showError('Error deleting Image');
      });
    await this.getLabourParty(this.config.labourMasterVariable.labourMaster);
  }

  async onSubmit(labourPartyId: string) {
    if (this.labourForm.invalid) return;

    // if (this.labourForm.controls['labourPartyName'].value != '')
    //   await this.labourMasterService
    //     .uploadFile(this.file)
    //     .then((url) => {
    //       this.labourForm.setValue({ labourProfileImg: url });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.notificationService.showError('Error uploading Image');
    //       return;
    //     });

    if (this.labourForm.controls['labourProfileImg'].value != '')
      await this.labourMasterService
        .addLabourParty(labourPartyId, this.labourForm.value)
        .then((res) => {
          this.labourForm.reset();
          this.isModalOpen = false;
          this.removePic();
          this.modalController.dismiss();
          this.notificationService.showSuccess(
            labourPartyId === ''
              ? this.config.messages.addedSuccessfully
              : this.config.messages.updatedSuccessfully
          );
        })
        .catch((err) => {
          console.log(err);
          this.notificationService.showError('Something Went Wrong');
          return;
        });

    await this.getLabourParty(this.config.labourMasterVariable.labourMaster);
  }
}
