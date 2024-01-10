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
  },
  storage: {
    labourParty: 'labourParty-Library',
    vendors: 'vendors-Library',
  },
  hardData: {
    postalCode: ['226029', '211001', '110241', '224531'],
    shippingType: ['Truck', 'Mini-Truck'],
  },
  permissions: {
    upload_new_zsd_file: 'UPLOAD_NEW_ZSD_FILE',
    fill_shipment_voucher: 'FILL_SHIPMENT_VOUCHER',
    fill_post_delivery_form: 'FILL_POST_DELIVERY_FORM',
    discard_vouchers: 'DISCARD_VOUCHERS',
    edit_account_settings: 'EDIT_ACCOUNT_SETTINGS',
    view_reports: 'VIEW_REPORTS',
  },
};
