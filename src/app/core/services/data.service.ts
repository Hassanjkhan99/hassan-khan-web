import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataInterface, DataItem} from "@interfaces/data.interface";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BehaviorSubject, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Order, Sort} from "@enums/*";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class DataService {

  items: Subject<DataItem[]> = new Subject<DataItem[]>()
  totalCount: number = 0;
  currentPage: number = 0
  currentSearch: string = ''
  currentSort: string = ''
  currentOrder: string = ''
  isRateLimitReached: boolean = false;
  isLoadingResults: boolean = false;
  noRecords: boolean = true;
  isShowAvatarImage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  public search(value: string = '', page: number = 1, sort: string = Sort.login, order: string = Order.asc) {
    this.isLoadingResults = true;
    this.items.next([])
    return this.http.get<DataInterface>(`https://api.github.com/search/users?q=${value} in:login`, {
      params: {
        page: page,
        per_page: 9,
        sort: sort,
        order: order
      },
    }).pipe(untilDestroyed(this)).subscribe((data) => {

      this.items.next(data.items);
      this.totalCount = data.total_count;
      this.currentPage = page;
      this.currentSearch = value;
      this.currentSort = sort;
      this.currentOrder = order;

      if (data.total_count === 0) {
        this._snackBar.open(`No Record Found Text '${value}' Try Another Value`, 'ERROR');
        this.noRecords = true;
        return;
      }

      this.noRecords = false;


      this.openSnackBar(`Fetched ${data.total_count} Records For Text '${value}' Currently On Page '${page}' Sorted By '${sort}' in '${order}' order`, 'SUCCESS');

    }, () => {
    }, () => {
      this.isLoadingResults = false;
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)._dismissAfter(2000)
  }
}
