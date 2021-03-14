import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { ValuteService } from '~services/valute.service';
import { WebsocketService } from '~services/websocket.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './valute.component.html',
  styleUrls: ['./valute.component.scss'],
  providers: [ValuteService]
})
export class ValuteComponent implements AfterViewInit, OnInit {

  public isLoading = false;

  valutesList = null;
  mapValutes = null;
  convertedValue = null;

  last_updated_at = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private valuteService: ValuteService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit() {
    this.websocketService.registerMessageCallbackFn((event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'notify_valutes_updated':
          console.log('valutes updated via websocket');
          this.updateValutes(data);
          break;
        default:
          console.error('unsupported event', data);
      }
    });
    this.websocketService.sendMessage(JSON.stringify({'action': 'connected'}));
  }

  ngAfterViewInit() {
    this.fetchValutes();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  updateConvertedValue () {
    setTimeout(() => {
      const amountOfMoney = (document.querySelector('.amount-of-money .mat-input-element') as HTMLInputElement).value;
      const targetCurrencyId = document.querySelector('.target-currency .mat-select-value-text span').textContent;

      this.convertedValue = (Number(amountOfMoney) / this.mapValutes[targetCurrencyId].value).toFixed(4);
    }, 50);
  }

  fetchValutes(): void {

    merge([])
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.valuteService.getValutes();
        }),
        map((data: any) => {
          this.isLoading = false;
          return data;
        }),
        catchError(() => {
          this.isLoading = false;

          return observableOf([]);
        })
      ).subscribe(data => {
        this.updateValutes(data);
        this.updateConvertedValue();
    });
  }

  updateValutes(data) {
    const newLastUpdatedAt = new Date(data['last_updated_at']);
    newLastUpdatedAt.setSeconds(0);
    this.last_updated_at = newLastUpdatedAt;

    this.valutesList = data.results;
    const newMapValutes = {};

    data.results.map((item) => {
      newMapValutes[item.name] = item;
    });

    this.mapValutes = newMapValutes;
  }


}
