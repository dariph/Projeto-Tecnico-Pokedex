import { BoxService } from "../services/BoxService.js";
import { PokeApiService } from "../services/PokeApiService.js";

export class TerminalController {
  constructor(
    private pokeApiService: PokeApiService,
    private boxService: BoxService,
  ) {}

  async iniciar(): Promise<void> {
    console.log("=== POKÉDEX TYPESCRIPT LITE ===\n");

    await this.boxService.carregarBox();

    const pikachu = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachu) await this.boxService.adicionar(pikachu);

    const charmander = await this.pokeApiService.buscarPokemon("charmander");
    if (charmander) await this.boxService.adicionar(charmander);

    console.log("\n--- Testando Duplicidade ---");
    const pikachuDuplicado = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachuDuplicado) await this.boxService.adicionar(pikachuDuplicado);

    console.log("\n--- Testando Busca Inválida ---");
    await this.pokeApiService.buscarPokemon("pokemon-inexistente");

    this.boxService.listar();

    console.log("--- Testando Remoção ---");
    await this.boxService.remover(25);

    this.boxService.listar();
  }
}
