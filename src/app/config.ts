export const Config = {
  formSettingVariable: {
    PostDlvPendingForm: 'post-dlv-pending-form',
    VoucherPendingForm: 'voucher-pending-form',
  },
  messages: {
    addedSuccessfully: 'Added Successfully',
    updatedSuccessfully: 'Updated Successfully',
    deletedSuccessfully: 'Deleted Successfully',
    errorOccurred: 'Error Occurred. Please try again',
    pleaseWait: 'Please wait...',
    areYouSure: 'Are You Sure',
    emailExist: 'Email ID Already exist',
    contactExist: 'Contact Number already exist',
    smsError: 'SMS could not be sent. Please try Again!',
    invalidOTP: 'Invalid OTP',
  },
  collection: {
    account: 'account',
    expenseType: 'expense-type',
    settings: 'settings',
    variables: 'variables',
    labourMaster: 'labour-master',
    vendorMaster: 'vendor-master',
    role: 'role',
    users: 'users',
    vehiclesCategory: 'vehicles-Category',
    vehicleTypes: 'vehicleTypes',
  },
  storage: {
    labourParty: 'labourParty-Library',
    vendors: 'vendors-Library',
    userPhoto: 'user-photo',    
  },
  hardData: {
    postalCode: ['226029', '211001', '110241', '224531'],
    shippingType: ['Truck', 'Mini-Truck'],
  },
  permissions: {
    upload_new_zsd_file: 'upload_new_zsd_file',
    fill_shipment_voucher: 'fill_shipment_voucher',
    fill_post_delivery_form: 'fill_post_delivery_form',
    discard_vouchers: 'discard_vouchers',
    edit_account_settings: 'edit_account_settings',
    view_reports: 'view_reports',
  },
  localStorage: {
    userdata: 'userdata',
  },
  url: {
    dicebear: 'https://api.dicebear.com/7.x/initials/svg?seed='
  }
};
