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
    constructor(private http: Http) {

    }
    getCharacters(hash: string, offset: number, initialLetter: string): Promise<Character[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/characters?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        if (offset && offset !== 0 ) {
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
                    const result: Character[] = response.data;
                    console.log(response);
                    resolve(result);
                })
                .catch(err => reject(err));
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
                    const result: Comic[] = response.data;
                    console.log(response);
                    resolve(result);
                })
                .catch(err => reject(err));
        });
    }

    getEvents(hash: string, offset: number, initialLetter: string): Promise<Event[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/events?';
        this.shash = hash + this.priKey + this.pubKey;
        this.shash = md5(this.shash);
        if (offset !== 0 && offset) {
            this.getUrl = this.getUrl + 'offset=' + offset + '&';
        }
        if (initialLetter && initialLetter != '*') {
            this.getUrl = this.getUrl + 'nameStartsWith=' + initialLetter + '&';
        }
        this.getUrl = this.getUrl + 'orderBy=name&limit='
            + this.limit + '&ts=' + hash + '&apikey='
            + this.pubKey + '&hash=' + this.shash;
        console.log(this.getUrl);
        return new Promise<Event[]>((resolve, reject) => {
            this.http.get(this.getUrl)
                .toPromise()
                .then((response: any) => {
                    response = response.json();
                    const result: Event[] = response.data;
                    console.log(response);
                    resolve(result);
                })
                .catch(err => reject(err));
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
                    const result: Character[] = response.data;
                    console.log(response);
                    resolve(result);
                })
                .catch(err => reject(err));
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
                    const result: Comic[] = response.data;
                    console.log(response);
                    resolve(result);
                })
                .catch(err => reject(err));
        });
    }

    getEvent(hash: string, id: string): Promise<Event[]> {
        this.getUrl = 'http://gateway.marvel.com/v1/public/comics/' + id + '?';
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
                    const result: Event[] = response.data;
                    console.log(response);
                    resolve(result);
                })
                .catch(err => reject(err));
        });
    }

    saveLocalStorage(type: string, response: any): void {
        for (let i = 0; i < response.data.length; i++) {
            localStorage[type].push(response.data.results[i]);
        }
    }

    loadLocalStorage(type: string, offset: string, initialLetter: string): void {
        let data: any;
        let results: any[];
        data.total = localStorage[type].length;
        if (type === 'comics' || type === 'comic') {
            data.results = localStorage[type].filter(item =>
                initialLetter === '*' || item.title[0] === initialLetter
            ).slice(offset, 100);
        }else{
            data.results = localStorage[type].filter(item =>
                initialLetter === '*' || item.name[0] === initialLetter
            ).slice(offset, 100);
        }
    }
}