import { Model } from 'sequelize'
import {
  snapshot_myTerminal_snapshot_customers,
  snapshot_myTerminal_snapshot_customers_addresses,
} from '../../GraphQL/__generated__/snapshot'
import { DBType } from 'types'

export class CustomerModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: number
  public data!: string

  public fromDB = (): Customer => {
    const data: Exclude<
      snapshot_myTerminal_snapshot_customers,
      ['id', '_revision']
    > = JSON.parse(this.data)
    return new Customer(
      this.id,
      this._revision,
      data.customerName,
      data.phone,
      data.vatNumber,
      data.addresses
    )
  }
}
export class Customer {
  constructor(
    public id: string,
    public _revision: number,
    public customerName: string | null,
    public phone: string,
    public vatNumber: string | null,
    public addresses: snapshot_myTerminal_snapshot_customers_addresses[]
  ) {}

  public static fromSnapshot = (
    object: snapshot_myTerminal_snapshot_customers
  ): Customer => {
    return new Customer(
      object.id,
      object._revision,
      object.customerName,
      object.phone,
      object.vatNumber,
      object.addresses
    )
  }

  public toDB = (): DBType => {
    return {
      id: this.id,
      _revision: this._revision,
      data: JSON.stringify({
        customerName: this.customerName,
        phone: this.phone,
        vatNumber: this.vatNumber,
        addresses: this.addresses,
      }),
    }
  }
}
