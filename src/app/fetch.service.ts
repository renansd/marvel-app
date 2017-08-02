import { Component } from '@angular/core';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { md5 } from './md5';
import { Comic } from './comic';
import { Event } from './event';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Fetch {
    shash: string;
    getUrl: string;
    pubKey = 'c3e1b1ac238ba05f97c4cfc0cf8fb40a';
    priKey = 'a38f1577ceadb43d2788a8cb6cf3a8629fe4f737';
    limit = '100';
    status: number;
    constructor(private http: Http) {
        this.status = 1;
    }
    getCharacters(hash: string, offset: number, initialLetter: string): Promise<Character[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/characters?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        if (offset && offset !== 0) {
            console.log("OLHA EU AQUI" + offset);
            this.getUrl = this.getUrl + 'offset=' + offset + '&';
        }
        if (initialLetter && initialLetter != '*') {
            this.getUrl = this.getUrl + 'nameStartsWith=' + initialLetter + '&';
        }
        this.getUrl = this.getUrl + 'orderBy=name&limit='
            + this.limit + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        return new Promise<Character[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    console.log(response);
                    if (response.code == '200') {
                        this.status = 1;
                        const result: Character[] = response.data;
                        this.saveLocalStorage('characters', response.data.results);
                        resolve(result);
                    } else {
                        if (this.status === 1) {
                            alert("Connection with server failed. Offline mode is on.");
                            this.status = 0;
                        }
                        const result = this.loadLocalStorage('characters', offset, initialLetter, '0');
                        resolve(result);
                    }

                })
                .catch(err => {
                    if (this.status === 1) {
                        alert("Connection with server failed. Offline mode is on.");
                        this.status = 0;
                    }
                    const result = this.loadLocalStorage('characters', offset, initialLetter, '0');
                    resolve(result);
                });
        });
        //this.rCharacter = new Character(1, 'Renan');       
    }

    getComics(hash: string, offset: number, initialLetter: string): Promise<Comic[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/comics?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        if (offset !== 0 && offset) {
            this.getUrl = this.getUrl + 'offset=' + offset + '&';
        }
        if (initialLetter && initialLetter != '*') {
            this.getUrl = this.getUrl + 'titleStartsWith=' + initialLetter + '&';
        }
        this.getUrl = this.getUrl + 'orderBy=title&limit='
            + this.limit + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        console.log(hash);
        return new Promise<Comic[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    if (response.code == '200') {
                        this.status = 1;
                        const result: Comic[] = response.data;
                        this.saveLocalStorage('comics', response.data.results);
                        resolve(result);
                    } else {
                        if (this.status === 1) {
                            alert("Connection with server failed. Offline mode is on.");
                            this.status = 0;
                        }
                        const result = this.loadLocalStorage('comics', offset, initialLetter, '0');
                        resolve(result);
                    }
                })
                .catch(err => {
                    if (this.status === 1) {
                        alert("Connection with server failed. Offline mode is on.");
                        this.status = 0;
                    }
                    const result = this.loadLocalStorage('comics', offset, initialLetter, '0');
                    resolve(result);
                });
        });
    }

    getEvents(hash: string, offset: number, initialLetter: string): Promise<Event[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/events?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        if (offset !== 0 && offset) {
            this.getUrl = this.getUrl + 'orderBy=name&offset=' + offset + '&';
        }
        if (initialLetter && initialLetter != '*') {
            this.getUrl = this.getUrl + 'nameStartsWith=' + initialLetter + '&';
        }
        this.getUrl = this.getUrl + 'limit='
            + this.limit + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        return new Promise<Event[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    if (response.code == '200') {
                        this.status = 1;
                        const result: Event[] = response.data;
                        this.saveLocalStorage('events', response.data.results);
                        resolve(result);
                    } else {
                        if (this.status === 1) {
                            alert("Connection with server failed. Offline mode is on.");
                            this.status = 0;
                        }
                        const result = this.loadLocalStorage('events', offset, initialLetter, '0');
                        resolve(result);
                    }
                })
                .catch(err => {
                    if (this.status === 1) {
                        alert("Connection with server failed. Offline mode is on.");
                        this.status = 0;
                    }
                    const result = this.loadLocalStorage('events', offset, initialLetter, '0');
                    resolve(result);
                });
        });
    }

    getCharacter(hash: string, id: string): Promise<Character[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/characters/' + id + '?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        this.getUrl = this.getUrl
            + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        return new Promise<Character[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    if (response.code == '200') {
                        this.status = 1;
                        const result: Character[] = response.data;
                        this.saveLocalStorage('characters', response.data.results);
                        resolve(result);
                    } else {                        
                        const result = this.loadLocalStorage('character', 0, '*', id);
                        resolve(result);
                    }
                })
                .catch(err => {                    
                    const result = this.loadLocalStorage('character', 0, '*', id);
                    resolve(result);
                });
        });
    }

    getComic(hash: string, id: string): Promise<Comic[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/comics/' + id + '?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        this.getUrl = this.getUrl
            + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        return new Promise<Comic[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    if (response.code == '200') {
                        this.status = 1;
                        const result: Comic[] = response.data;
                        this.saveLocalStorage('comics', response.data.results);
                        resolve(result);
                    } else {                        
                        const result = this.loadLocalStorage('comic', 0, '*', id);
                        resolve(result);
                    }
                })
                .catch(err => {                    
                    const result = this.loadLocalStorage('comic', 0, '*', id);
                    resolve(result);
                });
        });
    }

    getEvent(hash: string, id: string): Promise<Event[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/events/' + id + '?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        this.getUrl = this.getUrl
            + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        return new Promise<Event[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    if (response.code == '200') {
                        this.status = 1;
                        const result: Event[] = response.data;
                        this.saveLocalStorage('events', response.data.results);
                        resolve(result);
                    } else {                        
                        const result = this.loadLocalStorage('event', 0, '*', id);
                        resolve(result);
                    }
                })
                .catch(err => {                    
                    const result = this.loadLocalStorage('event', 0, '*', id);
                    resolve(result);
                });
        });
    }

    saveLocalStorage(type: string, data: any): void {
        let idx;
        let array: any[];
        if (!localStorage[type]) {
            localStorage[type] = '[]';
        } else {
            array = JSON.parse(localStorage[type]);
        }
        if (!Array.isArray(array)) array = [];
        for (let i = 0; i < data.length; i++) {
            idx = array.findIndex(item =>
                item.id === data[i].id
            );
            if (idx !== -1) {
                array[idx] = data[i];
            } else {
                array.push(data[i]);
            }
        }
        localStorage[type] = JSON.stringify(array);
    }

    loadLocalStorage(type: string, offset: number, initialLetter: string, id: string): any[] {
        let data: any = {};
        let results: any[];
        let array: any[];
        if (type === 'character' || type === 'comic' || type == 'event') array = JSON.parse(localStorage[type + 's']);
        else array = JSON.parse(localStorage[type]);
        data.total = array.length;
        if (type === 'comics' || type === 'comic' || type === 'events' || type === 'event') {
            array.sort((n1, n2) => {
                if (n1.title > n2.title) {
                    return 1;
                }
                if (n1.title < n2.title) {
                    return -1;
                }
                return 0;
            });
            if (type === 'comics' || type === 'events') {
                data.results = array.filter(item =>
                    initialLetter === '*' || item.title[0] === initialLetter
                ).slice(offset, offset + 100);
            } else {
                data.results = array.filter(item =>
                    item.id == id
                ).slice(offset, offset + 100);
            }
        } else {
            array.sort((n1, n2) => {
                if (n1.name > n2.name) {
                    return 1;
                }
                if (n1.name < n2.name) {
                    return -1;
                }
                return 0;
            });
            if (type === 'characters') {
                data.results = array.filter(item =>
                    initialLetter === '*' || item.name[0] === initialLetter
                ).slice(offset, offset + 100);
            } else {
                data.results = array.filter(item =>
                    item.id == id
                ).slice(offset, offset + 100);
            }
        }
        return data;
    }
}