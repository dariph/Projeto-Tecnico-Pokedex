import { TerminalController } from "./controllers/TerminalController.js";
import { BoxService } from "./services/BoxService.js";
import { PokeApiService } from "./services/PokeApiService.js";

async function main() {
  const pokeApiService = new PokeApiService();
  const boxService = new BoxService();

  const terminalController = new TerminalController(pokeApiService, boxService);

  await terminalController.iniciar();
}

main().catch((erro: unknown) => {
  console.error("Erro na execução principal:", erro);
});
