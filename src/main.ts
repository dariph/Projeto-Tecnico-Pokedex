import { PokeApiService } from "./services/PokeApiService";
import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main() {
  const pokeApiService = new PokeApiService();
  const boxService = new BoxService();

  const terminalController = new TerminalController(pokeApiService, boxService);

  await terminalController.iniciar();
}

main();
