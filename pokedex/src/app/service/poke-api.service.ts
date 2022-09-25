import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100';
  constructor(
    private http: HttpClient
  ) { }

  // Ou apiListAllPokemons(): Observable
  // A diferença é que com a função sem o get, dev-se chamar a função com this.service.apiListAllPokemons().
  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(
        res => res
      ),
      //O tap faz uma ação mas não retorna um valor obrigatóriamente, como o map
      //Neste caso, queremos incluir o status em cada item dentro do results. O results é mapeado e chamado o método get para listar, a url é a resposta.url. Então é mapeado novamente e no subscribe, ele adiciona o status
      tap(res => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe(
            res => resPokemons.status = res
          )
        })
      })
    )
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    )
  }
}
