import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormSettingService } from './form-settings.service';
import { Config } from 'src/app/config';
import { LoadingController, ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/utils/notification';

@Component({
  selector: 'app-form-setting',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.scss'],
})
export class FormSettingComponent implements OnInit {
  presentingElement: any = '' || null;
  formSettings: FormGroup = new FormGroup({
    variableName: new FormControl('', [Validators.required]),
    variableType: new FormControl('', [Validators.required]),
    lowerLimit: new FormControl('', [Validators.required]),
    upperLimit: new FormControl('', [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    isZSD: new FormControl(false, []),
    id: new FormControl(''),
  });
  public formInitalValue = this.formSettings.value;
  isModalOpen: boolean = false;
  public config = Config;
  public formVariable = '';
  public variableData: any = {
    'post-dlv-pending-form': [],
    'voucher-pending-form': [],
  };
  variableId: string = '';
  public showConfirm = false;
  public toDelete: any;
  private loader: any;

  constructor(
    private formSettingService: FormSettingService,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.loader = await this.loadingController.create({
      message: 'Please wait...',
    });
    this.loader.present();
    await this.getSettings(this.config.formSettingVariable.PostDlvPendingForm);
    await this.getSettings(this.config.formSettingVariable.VoucherPendingForm);
    this.loader.dismiss();
  }

  openModal(event: any, formId: string) {
    event.stopPropagation();
    this.isModalOpen = true;
    this.formVariable = formId;
  }

  closeModal() {
    this.isModalOpen = false;
    this.formSettings.reset(this.formInitalValue);
  }

  async getSettings(formId: string) {
    const data = await this.formSettingService.getSettings(formId);
    const variables = data.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    this.variableData[formId] = variables;
  }

  async submitForm() {
    if (!this.formSettings.valid) {
      this.formSettings.markAllAsTouched();
      return;
    }
    if (this.formSettings.value.id == '') {
      await this.formSettingService.addSettings(
        this.formVariable,
        this.formSettings.value
      );
      this.notificationService.showSuccess(
        this.config.messages.addedSuccessfully
      );
    } else {
      await this.formSettingService.updateSettings(
        this.formVariable,
        this.formSettings.value
      );
      this.notificationService.showSuccess(
        this.config.messages.updatedSuccessfully
      );
    }
    this.formSettings.reset(this.formInitalValue);
    this.getSettings(this.formVariable);
    this.modalCtrl.dismiss();
    this.isModalOpen = false;
  }

  editVariable(variableData: any, formId: string) {
    this.isModalOpen = true;
    this.formVariable = formId;
    this.formSettings.setValue(variableData);
  }

  async delete(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.formSettingService.deleteSettings(
        this.toDelete.formSettingVariable,
        this.toDelete.id
      );
      await this.getSettings(this.toDelete.formSettingVariable);
      this.loader.dismiss();
      this.notificationService.showSuccess(
        this.config.messages.deletedSuccessfully
      );
    }
    this.showConfirm = false;
  }

  async updAccountStatus(
    $event: any,
    variableId: string,
    status: boolean,
    formVariable: string
  ) {
    $event.stopPropagation();
    this.loader.present();
    await this.formSettingService.updAccountStatus(
      formVariable,
      status,
      variableId
    );
    await this.getSettings(formVariable);
    this.loader.dismiss();
  }
}
