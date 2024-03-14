import { Injectable } from '@angular/core';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';

@Injectable({
  providedIn: 'root',
})
export class ShipmentDetailService {
  constructor(private shipmentService: ShipmentsService) {}

  async formatShipment(shipmentData: any) {
    if (!shipmentData.vendor) {
      shipmentData.vendor = [];
    }
    shipmentData.vendorDetails = {
      GSTNo: [],
      WSCode: [],
      WSName: [],
      WSTown: [],
      panNo: [],
      phoneNO: [],
      postalCode: [],
      distance: [],
      kot: [],
      invoiceNumber: [],
      gstInvoiceNumber: [],
      totalInvoiceAmount: [],
    };
    (
      await this.shipmentService.getVendor(
        shipmentData.vendorData.map((i: any, idx: number) => {
          return i.vendor;
        })
      )
    ).docs.map((vendor: any) => {
      const vdata = vendor.data();
      shipmentData.vendor.push({ ...vdata, id: vendor.id });
      vdata.GSTNo && shipmentData.vendorDetails.GSTNo.push(vdata.GSTNo);
      vdata.WSCode && shipmentData.vendorDetails.WSCode.push(vdata.WSCode);
      vdata.WSName && shipmentData.vendorDetails.WSName.push(vdata.WSName);
      vdata.WSTown && shipmentData.vendorDetails.WSTown.push(vdata.WSTown);
      vdata.panNo && shipmentData.vendorDetails.panNo.push(vdata.panNo);
      vdata.phoneNO && shipmentData.vendorDetails.phoneNO.push(vdata.phoneNO);
      vdata.postalCode &&
        shipmentData.vendorDetails.postalCode.push(vdata.postalCode);
      vdata.distance &&
        shipmentData.vendorDetails.distance.push(vdata.distance);
    });
    (await this.shipmentService.getVehicle(shipmentData.vehicle)).docs.map(
      (vehicle: any) => {
        shipmentData.vehicle = { ...vehicle.data(), id: vehicle.id };
      }
    );
    shipmentData.vendorDetails.kot = shipmentData.vendorData.map(
      (item: any) => {
        return item.KOT;
      }
    );

    shipmentData.vendorDetails.GSTNo =
      shipmentData.vendorDetails.GSTNo.join(', ');
    shipmentData.vendorDetails.WSCode =
      shipmentData.vendorDetails.WSCode.join(', ');
    shipmentData.vendorDetails.WSName =
      shipmentData.vendorDetails.WSName.join(', ');
    shipmentData.vendorDetails.WSTown =
      shipmentData.vendorDetails.WSTown.join(', ');
    shipmentData.vendorDetails.panNo =
      shipmentData.vendorDetails.panNo.join(', ');
    shipmentData.vendorDetails.phoneNO =
      shipmentData.vendorDetails.phoneNO.join(', ');
    shipmentData.vendorDetails.postalCode =
      shipmentData.vendorDetails.postalCode.join(', ');
    shipmentData.vendorDetails.distance =
      shipmentData.vendorDetails.distance.reduce(
        (acc: number, item: string) => {
          acc += parseInt(item);
          return acc;
        },
        0
      );
    shipmentData.vendorDetails.kot = shipmentData.vendorDetails.kot.reduce(
      (acc: number, item: string) => {
        acc += parseInt(item);
        return acc;
      },
      0
    );
    shipmentData.vendorDetails.invoiceNumber = shipmentData.vendorData
      .map((item: any) => {
        return item.CustomInvoiceNo;
      })
      .join(', ');
    shipmentData.vendorDetails.gstInvoiceNumber = shipmentData.vendorData
      .map((item: any) => {
        return item.GSTInvoiceNumber;
      })
      .join(', ');
    shipmentData.vendorDetails.totalInvoiceAmount =
      shipmentData.vendorData.reduce((acc: number, item: any) => {
        acc += parseInt(item.TotalInvoiceAmount);
        return acc;
      }, 0);
    return shipmentData;
  }
}
