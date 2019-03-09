import { bootstrap } from "vesper";
import { ItemsController } from "./controller/ItemsController";
import { Item } from "./entity/Item";

bootstrap({
  port: 4000,
  controllers: [ItemsController],
  entities: [Item],
  schemas: [__dirname + "/schema/**/*.graphql"],
  cors: true
})
  .then(() => {
    console.log(
      "Your app is up and running on http://localhost:4000. " +
        "You can use playground in development mode on http://localhost:4000/playground"
    );
  })
  .catch(error => {
    console.error(error.stack ? error.stack : error);
  });
