import { FieldDAO } from "../dao/field";
import { FieldPoolDAO } from "../dao/field-pool";

export class FieldDatabase {
  #fieldDao: FieldDAO;
  #poolDao: FieldPoolDAO;

  constructor(fieldDao: FieldDAO, fieldPoolDao: FieldPoolDAO) {
    this.#fieldDao = fieldDao;
    this.#poolDao = fieldPoolDao;
  }

  async createPool(poolName: string, fieldNames: string[]) {
    const poolId = await (this.#poolDao.create({ name: poolName }));
    fieldNames.forEach((field) => (this.#fieldDao.create({ name: field, poolId: poolId })));
  }
}