import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";
import { formatarNomeParaBusca } from "../utils/textFormatters";

export class PokeApiService {
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    const query = formatarNomeParaBusca(nomeOuId);
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    try {
      const resposta = await fetch(url);

      if (!resposta.ok) {
        console.log(`[ERRO] Pokémon não encontrado: ${query}`);
        return null;
      }

      const dados = (await resposta.json()) as PokemonApiResponse;

      const tipos = dados.types.map((item) => item.type.name);

      const pokemonResumo: PokemonResumo = {
        id: dados.id,
        nome: dados.name,
        tipos: tipos,
        altura: dados.height,
        peso: dados.weight,
      };

      console.log(`[OK] Pokémon encontrado: ${pokemonResumo.nome}`);
      return pokemonResumo;
    } catch (erro) {
      console.log("[ERRO] Não foi possível buscar o Pokémon. Falha na rede.");
      return null;
    }
  }
}
