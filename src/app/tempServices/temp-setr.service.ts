import {EventEmitter, Injectable, Input, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempSetrService {
  constructor() { }
  @Output() change2: EventEmitter<{email: string, password: string}> = new EventEmitter();
  someEvent(tempUser: {email: string, password: string}) {
    this.change2.emit(tempUser);
  }
}

