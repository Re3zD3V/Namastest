import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalog } from '../models/catalog';
import { environment } from 'src/environments/environment';
import { URL_BACK_CATALOGS } from '../shared/constants/apiEndpoints';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) { }

  // Create a new catalog
  createCatalog(item: Catalog): Observable<Catalog> {
    return this.http
      .post<Catalog>(`${environment.baseUrl}${URL_BACK_CATALOGS}`, { "title": `${item.title}`, "description": `${item.description}`, "author": `/api/users/${item.author.id}` });
  }

  // Get single Catalog data by ID
  getCatalog(id): Observable<Catalog> {
    return this.http.get<Catalog>(
      `${environment.baseUrl}${URL_BACK_CATALOGS}/${id}`
    );
  }

  // Get Catalog data
  getCatalogsList(page = 1): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${URL_BACK_CATALOGS}`);
  }

  // Update Catalog by id
  updateCatalog(id, item: Catalog): Observable<Catalog> {
    //TODO: Supprimer le if ci-dessous après mise en place des vérifs
    if (item.description == undefined) {
      item.description = "";
    }

    let result = '{"title":"' + item.title + '","description":"' + item.description;

    if (item.tests.length > 0) {
      result += '","tests":["';
      for (let i = 0; i < item.tests.length; i++) {
        if (i < item.tests.length - 1) {
          result += '/api/tests/' + item.tests[i].id.toString() + '","';
        } else {
          result += '/api/tests/' + item.tests[i].id.toString() + "\"]}";
        }
      }
    } else {
      result += '","tests":[]}';
    }

    console.log(result);

    return this.http
      .patch<Catalog>(
        `${environment.baseUrl}${URL_BACK_CATALOGS}/${id}`, result);
  }

  // Delete Catalog by id
  deleteCatalog(id) {
    return this.http
      .delete<Catalog>(
        `${environment.baseUrl}${URL_BACK_CATALOGS}/${id}`,
      )
  }
}
