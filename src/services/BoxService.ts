import fs from "node:fs/promises";
import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";

export class BoxService {
  private pokemons: PokemonResumo[] = [];
  private readonly filePath = "./pc_box.json";

  // Camada de Persistência Local usando node:fs/promises
  async carregarBox(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      this.pokemons = JSON.parse(data);
    } catch (error) {
      // Cria o array vazio se o arquivo falhar ou não existir
      this.pokemons = [];
      await this.salvarBox();
    }
  }

  private async salvarBox(): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.pokemons, null, 2));
    } catch (error) {
      throw new LocalBoxError("Falha ao salvar no pc_box.json");
    }
  }

  async adicionar(pokemon: PokemonResumo): Promise<void> {
    // Uso do método some
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    await this.salvarBox();
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("\nCatálogo atual:");
    // Uso do método forEach
    this.pokemons.forEach((pokemon) => {
      console.log(
        `#${pokemon.id} ${pokemon.nome} | Tipos: ${pokemon.tipos.join(", ")} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`,
      );
    });
    console.log("-------------------------\n");
  }

  async remover(id: number): Promise<void> {
    const existe = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    // Uso do método filter
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    await this.salvarBox();
    console.log("[OK] Pokémon removido do catálogo.");
  }
}
