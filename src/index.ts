import "reflect-metadata";

import { app } from "./app";
import { DependencyRegistry } from "./infrastructure/config/di.config";
import { ConfigService } from "./domain/services/config/config.service";

const dependencyRegistry = new DependencyRegistry();

const configService = dependencyRegistry.container.resolve<ConfigService>(
  ConfigService.name
);

const port = configService.get<string>("PORT");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
