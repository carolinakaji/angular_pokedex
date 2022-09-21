import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/ability/?limit=0&offset=100';
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
      tap(res => console.log(res))
    )
  }
}
