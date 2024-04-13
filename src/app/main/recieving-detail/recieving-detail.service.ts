import { Injectable } from '@angular/core';
import { ReceivingsService } from '../home/tabs/vendors/receivings.service';

@Injectable({
  providedIn: 'root',
})
export class RecievingDetailService {
  constructor(private recievingsService: ReceivingsService) {}

  supplier: SupplierDetails = {
    deliveryNo: [],
    mfgLocation: [],
    supplierID: [],
    supplierName: [],
  };

  async formatReceiving(recievingData: any) {
    if (!recievingData.supplier) recievingData.supplier = [];

    recievingData.supplierDetails = this.supplier;

    await recievingData.supplierData.map((i: any, idx: number) => {
      this.recievingsService.getSuppliers(i.supplierID).then((supplier) => {
        const sdata = supplier.data();
        recievingData.supplier.push({ ...sdata, id: supplier.id });
        if (sdata) {
          sdata['deliveryNo'] &&
            recievingData.supplierDetails.deliveryNo.push(sdata['deliveryNo']);
          sdata['mfgLocation'] &&
            recievingData.supplierDetails.mfgLocation.push(
              sdata['mfgLocation']
            );
          sdata['supplierID'] &&
            recievingData.supplierDetails.supplierID.push(sdata['supplierID']);
          sdata['supplierName'] &&
            recievingData.supplierDetails.supplierName.push(
              sdata['supplierName']
            );
        }
      });
    });

    return recievingData;
  }
}

export interface SupplierDetails {
  deliveryNo: Array<String>;
  mfgLocation: Array<String>;
  supplierID: Array<String>;
  supplierName: Array<String>;
}
