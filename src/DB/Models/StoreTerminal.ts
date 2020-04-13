import { Model } from 'sequelize'

export class StoreTerminalModel extends Model {
  public id!: string // Note that the `null assertion`,  `!` is required in strict mode.
  public _revision!: string
  public data!: string
}
export declare type StoreTerminal = Omit<StoreTerminalModel, keyof Model>

export const storeTerminalParser = (data: any): StoreTerminal => {
  return {
    id: data.id,
    _revision: data._revision,
    data: JSON.stringify({
      code: data.code,
      nameTranslation: {
        arSa: data.nameTranslation.arSa,
        enUs: data.nameTranslation.enUs,
      },
      keepLocalDataDuration: data.keepLocalDataDuration,
      location: { id: data.location.id },
    }),
  }
}
