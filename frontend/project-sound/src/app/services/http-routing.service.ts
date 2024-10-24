import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRoutingService {
  /**
   * Creates an instance of ApiService.
   * @param {HttpClient} http - The Angular HttpClient used to perform HTTP requests.
   */
  constructor(private http: HttpClient) {}
  /**
   * The base URL for API requests, sourced from the environment configuration.
   */
  private readonly APIUrl = 'http://localhost:3000/';
  /**
   * Performs a GET request to the specified URL with optional query parameters.
   * @param {string} url - The endpoint URL (relative to the base API URL).
   * @param {{ [param: string]: string | string[] }} [queryParams] - Optional query parameters to include in the request.
   * @returns {Observable<T>} - An observable containing the response data.
   */
   getRequest<T>(url: string, queryParams?: { [param: string]: string | string[] }): Observable<T> {
    url = url.replace(/#/g, "%23");
    return this.http.get<T>(this.APIUrl + url, { params: queryParams });
  }

  /**
   * Performs a POST request to the specified URL with the provided data and optional query parameters.
   * @template T - The type of the response data.
   * @template U - The type of the request data.
   * @param {string} url - The endpoint URL (relative to the base API URL).
   * @param {U} data - The data to send in the body of the request.
   * @param {{ [param: string]: string | string[] }} [queryParams] - Optional query parameters to include in the request.
   * @returns {Observable<T>} - An observable containing the response data.
   */
  postRequest<T, U>(url: string, data: U, queryParams?: { [param: string]: string | string[] }): Observable<T> {
    url = url.replace(/#/g, "%23");
    return this.http.post<T>(this.APIUrl + url, data, { params: queryParams });
  }

  /**
   * Performs a PUT request to the specified URL with the provided data and optional query parameters.
   * @template T - The type of the response data.
   * @template U - The type of the request data.
   * @param {string} url - The endpoint URL (relative to the base API URL).
   * @param {U} data - The data to send in the body of the request.
   * @param {{ [param: string]: string | string[] }} [queryParams] - Optional query parameters to include in the request.
   * @returns {Observable<T>} - An observable containing the response data.
   */
  putRequest<T,U>(url?: string, data?: U, queryParams?: { [param: string]: string | string[] }): Observable<T> {
    url = url?.replace(/#/g, "%23");
    return this.http.put<T>(this.APIUrl + url, data, { params: queryParams });
  }

  /**
   * Performs a DELETE request to the specified URL with optional query parameters.
   * @param {string} url - The endpoint URL (relative to the base API URL).
   * @param {{ [param: string]: string | string[] }} [queryParams] - Optional query parameters to include in the request.
   * @returns {Observable<T>} - An observable containing the response data.
   */
  deleteRequest<T>(url: string, queryParams?: { [param: string]: string | string[] }): Observable<T> {
    url = url.replace(/#/g, "%23");
    return this.http.delete<T>(this.APIUrl + url, { params: queryParams });
  }
  /**
   * Fetches JSON data from the specified URL within the assets directory.
   * @template T - The type of the expected response data.
   * @param {string} url - The relative URL to the JSON file within the assets directory.
   * @returns {Observable<T>} - An observable containing the response data of type T.
   */
  getJson<T>(url: string): Observable<T> {
    return this.http.get<T>('/assets/' + url);
  }
}
