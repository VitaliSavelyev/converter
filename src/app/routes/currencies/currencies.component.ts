import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {CurrenciesService} from "../../services/currencies.service";
import {CurrencyResp, Rate} from "../../interfaces/interfaces";
import {switchMap, take, takeUntil} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>()
  public rates: Rate[] = []
  public control: FormControl
  public isClearTable: boolean = false;
  public loading: boolean = false;
  public isError: boolean = false;
  public maxDateValue = new Date()

  get isShowTable(): boolean {
    return !this.loading && !this.isError && !this.isClearTable
  }

  constructor(private readonly currenciesService: CurrenciesService) {
  }

  ngOnInit(): void {
    this.initControl()
    this.loading = true
    this.currenciesService.getCurrencies().pipe(take(1))
      .subscribe({
        next: (res: CurrencyResp[])=> {
          this.getResponse(res)
        },
        error: (err: any) => {
          this.loading = false
          this.isError = true
        }
      })
  }

  private initControl(): void {
    this.control = new FormControl('');
    this.control.valueChanges.pipe(takeUntil(this.destroy$),
      switchMap(value => {
        this.startLoading();
        const date = moment(value).format('YYYY-MM-DD')
        return this.currenciesService.getCurrencies(date);
      })).subscribe({
      next: (res: CurrencyResp[])=> {
        this.getResponse(res)
      },
      error: (err: any)  => {
        this.loading = false
        this.isError = true
      }
    })
  }

  public clearTable(): void {
    this.isClearTable = true;
  }

  private getResponse(res: CurrencyResp[]): void {
    if(!!res[0]?.rates) {
      this.rates = res[0].rates;
    } else {
      this.isError = true
    }
    this.loading = false;
  }

  private startLoading(): void {
    this.loading = true;
    this.isError = false;
    this.isClearTable = false
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
