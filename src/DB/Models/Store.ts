import { Model } from 'sequelize'

export class StoreModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: string
  public data!: string
}
export declare type Store = Omit<StoreModel, keyof Model>

export const storeParser = (data: any): Store => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      id: data.id,
      setting: {
        posLayout: data.setting.posLayout,
        allowDecimalQuantityForServices:
          data.setting.allowDecimalQuantityForServices,
        allowDecimalQuantity: data.setting.allowDecimalQuantity,
        numberOfInvoiceCopies: data.setting.numberOfInvoiceCopies,
        keepDataDuration: data.setting.keepDataDuration,
        numberOfDecimalsForPrice: data.setting.numberOfDecimalsForPrice,
        numberOfDecimalsForQuantity: data.setting.numberOfDecimalsForQuantity,
        discountType: data.setting.discountType,
        barcodeReaderNumberOfDecimalsForQuantity:
          data.setting.barcodeReaderNumberOfDecimalsForQuantity,
        barcodeReaderNumberOfDecimalsForPrice:
          data.setting.barcodeReaderNumberOfDecimalsForPrice,
        barcodeReaderNumberOfDigitsForPrice:
          data.setting.barcodeReaderNumberOfDigitsForPrice,
        barcodeReaderNumberOfDigitsForQuantity:
          data.setting.barcodeReaderNumberOfDigitsForQuantity,
        barcodeReaderSkuReaderWithValidationNumber:
          data.setting.barcodeReaderSkuReaderWithValidationNumber,
        kitLinesVisibilityInCart: data.setting.kitLinesVisibilityInCart,
        kitLinesVisibilityInInvoice: data.setting.kitLinesVisibilityInInvoice,
        kitLinesVisibilityInStationInvoice:
          data.setting.kitLinesVisibilityInStationInvoice,
        showCountersButtonsInQuantityField:
          data.setting.showCountersButtonsInQuantityField,
        requireReasonForBillModification:
          data.setting.requireReasonForBillModification,
        discountPosition: data.setting.discountPosition,
        enableTills: data.setting.enableTills,
        logoHeight: data.setting.logoHeight,
        logoWidth: data.setting.logoWidth,
        posThermalInvoiceLayout: data.setting.posThermalInvoiceLayout,
        enableBillingOrders: data.setting.enableBillingOrders,
        printPaymentMethods: data.setting.printPaymentMethods,
      },
    }),
  }
}
