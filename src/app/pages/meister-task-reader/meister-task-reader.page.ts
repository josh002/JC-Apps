import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

export interface ItemHora {
  date: string;
  client: string;
  project: string;
  note: string;
  hour: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-meister-task-reader',
  templateUrl: './meister-task-reader.page.html',
  styleUrls: ['./meister-task-reader.page.scss'],
})

export class MeisterTaskReaderPage implements OnInit {
  @ViewChild('inputFile') inputFile: HTMLIonInputElement;

  listItems: ItemHora[] = [];
  savedItems: ItemHora[] = [];
  totalHoras = 0;
  fromSearchDate: string | undefined;
  toSearchDate: string | undefined;

  constructor() { }

  ngOnInit() {
  }

  filterName(ev: any) {
    this.totalHoras = 0;
    this.listItems = this.listItems.filter((item, index) => {
      if (String(item.firstName).toLocaleLowerCase().includes((ev.target.value as string).toLocaleLowerCase())) { return true; }
      return false;
    });
    if (ev.target.value === '') { this.listItems = JSON.parse(JSON.stringify(this.savedItems)); }
  }

  filterDate(ev: any) {
    this.totalHoras = 0;
    this.listItems = this.listItems.filter((item, index) => {
      if (String(item.date).includes(ev.target.value)) { return true; }
      return false;
    });
    if (ev.target.value === '') { this.listItems = JSON.parse(JSON.stringify(this.savedItems)); }
  }

  getHours() {
    this.totalHoras = 0;
    this.listItems.forEach(item => this.totalHoras += item.hour);
  }

  public changeListener(ev: any) {
    const files: FileList = ev.target.files;
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0) as any;
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const csv: string = reader.result as string;
        const jsonArray = csv.split(/\r|\n|\r/);
        jsonArray.shift();

        jsonArray.forEach(item => {
          const arrItem = item.split(',');
          if (arrItem.length > 7) {
            const noteItem = arrItem.slice(3, arrItem.length - 3);
            arrItem.splice(3, noteItem.length, noteItem.join('').replace(',', ' '));
          }
          this.listItems.push({
            date: arrItem[0],
            client: arrItem[1],
            project: arrItem[2],
            note: arrItem[3],
            hour: parseFloat(arrItem[4]),
            firstName: arrItem[5],
            lastName: arrItem[6]
          });

        }
        );
        this.savedItems = JSON.parse(JSON.stringify(this.listItems));
      };
    }
  }


  fromDate($event: any) {
    this.fromSearchDate = $event.target.value;
  }

  toDate($event: any) {
    this.toSearchDate = $event.target.value;
  }

  calcularHoras() {
    this.listItems = this.listItems.filter(item => moment(item.date, 'MM/DD/YYYY')
      .isBetween(moment(this.fromSearchDate, 'YYYY-MM-DD'), moment(this.toSearchDate, 'YYYY-MM-DD'), null, '[]')
    );

    this.getHours();
  }

  async clickToInput() {
    const inputEl = await this.inputFile.getInputElement();
    inputEl.click();
  }

}
