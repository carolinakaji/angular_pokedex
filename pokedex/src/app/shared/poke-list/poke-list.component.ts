import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public getAllPokemons: any;
  private setAllPokemons: any;
  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(res => {
      this.setAllPokemons = res.results;
      this.getAllPokemons = this.setAllPokemons;
      // console.log(this.getAllPokemons)
    });
  }

  public getSearch(value: string){
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;

    /*Para que o filtro funcione, selecionando os cards com os pokemons conforme digita o nome e quando apaga, voltam os cards, criou-se o setAllPokemons, desta forma, sendo uma variável privada, somente o componente tem acesso. E ele armazena o valor do results, não o getAllPokemons. O getAllPokemons receberá o que for filtrado, mas o valor nunca será sobrescrito */
  }

}
