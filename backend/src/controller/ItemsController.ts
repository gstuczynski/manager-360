import { Controller, Mutation, Query } from "vesper";
import { EntityManager } from "typeorm";
import { Item } from "../entity/Item";

@Controller()
export class ItemsController {
  constructor(private entityManager: EntityManager) {}

  @Query()
  items() {
    return this.entityManager.find(Item);
  }

  @Query()
  itemGet({ id }) {
    return this.entityManager.findOne(Item, id);
  }

  @Mutation()
  itemSave(args) {
    const item = this.entityManager.create(Item, args);
    return this.entityManager.save(Item, item);
  }

  @Mutation()
  async itemDelete({ id }) {
    await this.entityManager.remove(Item, { id: id });
    return true;
  }
}
