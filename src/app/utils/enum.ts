export enum ShipmentStatus {
  PendingDispatch = 'pending-dispatch',
  PendingPostDelivery = 'pending-post-delivery',
  Completed = 'completed',
  Suspended = 'suspended',
}

export enum RecievingStatus {
  Pending = 'pending',
  VehicleArrived = 'vehicle-arrived',
  Completed = 'completed',
  Suspended = 'suspended',
}
