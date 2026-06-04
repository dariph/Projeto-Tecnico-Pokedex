import { PokeApiService } from "./services/PokeApiService";
import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

// Instancia os serviços, injeta as dependências e inicia o fluxo
async function main() {
  const pokeApiService = new PokeApiService();
  const boxService = new BoxService();

  const terminalController = new TerminalController(pokeApiService, boxService);

  await terminalController.iniciar();
}

main();
