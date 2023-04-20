import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Helper  {

  constructor() { }

  public getStoragePromise = async (key: string) => {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  removeAll(): void {
    localStorage.clear();
  }
}
