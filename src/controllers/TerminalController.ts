import { PokeApiService } from "../services/PokeApiService";
import { BoxService } from "../services/BoxService";

export class TerminalController {
  // Injeção de dependências via construtor
  constructor(
    private pokeApiService: PokeApiService,
    private boxService: BoxService,
  ) {}

  async iniciar(): Promise<void> {
    console.log("=== POKÉDEX TYPESCRIPT LITE ===\n");

    // Carrega o Banco de Dados local
    await this.boxService.carregarBox();

    // Testa: Busca válida e adição
    const pikachu = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachu) await this.boxService.adicionar(pikachu);

    const charmander = await this.pokeApiService.buscarPokemon("charmander");
    if (charmander) await this.boxService.adicionar(charmander);

    // Testa: Duplicidade
    console.log("\n--- Testando Duplicidade ---");
    const pikachuDuplicado = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachuDuplicado) await this.boxService.adicionar(pikachuDuplicado);

    // Testa: Busca inválida
    console.log("\n--- Testando Busca Inválida ---");
    await this.pokeApiService.buscarPokemon("pokemon-inexistente");

    // Testa: Listagem
    this.boxService.listar();

    // Testa: Remoção
    console.log("--- Testando Remoção ---");
    await this.boxService.remover(25);

    // Testa: Listagem final
    this.boxService.listar();
  }
}
