import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_orders,
  snapshot_myTerminal_snapshot_orders_priceModifierProvider,
  snapshot_myTerminal_snapshot_orders_customer,
  snapshot_myTerminal_snapshot_orders_delivery,
  snapshot_myTerminal_snapshot_orders_items,
  snapshot_myTerminal_snapshot_orders_location,
  snapshot_myTerminal_snapshot_orders_membership,
  snapshot_myTerminal_snapshot_orders_payments,
  snapshot_myTerminal_snapshot_orders_returns,
  snapshot_myTerminal_snapshot_orders_terminal,
  snapshot_myTerminal_snapshot_orders_returnPaymentMethod,
  snapshot_myTerminal_snapshot_orders_inventoryPhysicalLocation,
  snapshot_myTerminal_snapshot_orders_history,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'
import { DateTime, Decimal } from 'types/backend'
import {
  StoreOrderType,
  StoreOrderStage,
  StoreOrderStatus,
} from '__generated__/globalTypes'

export class OrderModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string
  public fromDB = (): Order => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_orders,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Order(
      this.id,
      this._revision,
      data.at,
      data.due,
      data.priceModifierProvider,
      data.orderType,
      data.totalDiscount,
      data.totalReturned,
      data.serialNumber,
      data.stage,
      data.subtotal,
      data.total,
      data.totalPayments,
      data.totalVat,
      data.note,
      data.itemsCount,
      data.status,
      data.billVersion,
      data.billNumber,
      data.customer,
      data.returnPaymentMethod,
      data.delivery,
      data.inventoryPhysicalLocation,
      data.items,
      data.location,
      data.membership,
      data.payments,
      data.returns,
      data.terminal,
      data.history
    )
  }
}
export class Order {
  constructor(
    public id: string,
    public _revision: number,
    public at: DateTime,
    public due: Decimal,
    public priceModifierProvider: snapshot_myTerminal_snapshot_orders_priceModifierProvider | null,
    public orderType: StoreOrderType | null,
    public totalDiscount: Decimal,
    public totalReturned: Decimal,
    public serialNumber: string,
    public stage: StoreOrderStage,
    public subtotal: Decimal,
    public total: Decimal,
    public totalPayments: Decimal,
    public totalVat: Decimal,
    public note: string | null,
    public itemsCount: Decimal,
    public status: StoreOrderStatus,
    public billVersion: number | null,
    public billNumber: string | null,
    public customer: snapshot_myTerminal_snapshot_orders_customer | null,
    public returnPaymentMethod: snapshot_myTerminal_snapshot_orders_returnPaymentMethod | null,
    public delivery: snapshot_myTerminal_snapshot_orders_delivery | null,
    public inventoryPhysicalLocation: snapshot_myTerminal_snapshot_orders_inventoryPhysicalLocation,
    public items: snapshot_myTerminal_snapshot_orders_items[],
    public location: snapshot_myTerminal_snapshot_orders_location,
    public membership: snapshot_myTerminal_snapshot_orders_membership,
    public payments: snapshot_myTerminal_snapshot_orders_payments[],
    public returns: snapshot_myTerminal_snapshot_orders_returns[],
    public terminal: snapshot_myTerminal_snapshot_orders_terminal,
    public history: snapshot_myTerminal_snapshot_orders_history[]
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_orders
  ): Order => {
    return new Order(
      object.id,
      object._revision,
      object.at,
      object.due,
      object.priceModifierProvider,
      object.orderType,
      object.totalDiscount,
      object.totalReturned,
      object.serialNumber,
      object.stage,
      object.subtotal,
      object.total,
      object.totalPayments,
      object.totalVat,
      object.note,
      object.itemsCount,
      object.status,
      object.billVersion,
      object.billNumber,
      object.customer,
      object.returnPaymentMethod,
      object.delivery,
      object.inventoryPhysicalLocation,
      object.items,
      object.location,
      object.membership,
      object.payments,
      object.returns,
      object.terminal,
      object.history
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        at: this.at,
        due: this.due,
        priceModifierProvider: this.priceModifierProvider,
        orderType: this.orderType,
        totalDiscount: this.totalDiscount,
        totalReturned: this.totalReturned,
        serialNumber: this.serialNumber,
        stage: this.stage,
        subtotal: this.subtotal,
        total: this.total,
        totalPayments: this.totalPayments,
        totalVat: this.totalVat,
        note: this.note,
        itemsCount: this.itemsCount,
        status: this.status,
        billVersion: this.billVersion,
        billNumber: this.billNumber,
        customer: this.customer,
        returnPaymentMethod: this.returnPaymentMethod,
        delivery: this.delivery,
        inventoryPhysicalLocation: this.inventoryPhysicalLocation,
        items: this.items,
        location: this.location,
        membership: this.membership,
        payments: this.payments,
        returns: this.returns,
        terminal: this.terminal,
        history: this.history,
      }),
    }
  }
}
