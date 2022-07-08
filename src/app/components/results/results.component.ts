import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataService} from "@service/data.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DataItem} from "@interfaces/*";
import {Order, Page, Sort} from "@enums/*"

@UntilDestroy()
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {
  displayedColumns = ['avatar_url', 'login', 'type'];
  dataSource: MatTableDataSource<DataItem> = new MatTableDataSource([] as DataItem[]);
  totalRecords: number = 0;
  pageSize: number = Page.defaultSize

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dataService: DataService) {
  }

  subscribeToItemsArray() {
    this.dataService.isShowAvatarImage.pipe(untilDestroyed(this)).subscribe(value => {
      if (value) {
        this.displayedColumns = ['avatar', 'avatar_url', 'login', 'type']
      } else {
        this.displayedColumns = ['avatar_url', 'login', 'type']
      }
    })
    // Get items from service via the items' property which is a subject
    this.dataService.items$.pipe(untilDestroyed(this)).subscribe(items => {
      // Assign the items to the items source for the table to render
      this.dataSource = new MatTableDataSource(items);
      this.totalRecords = this.dataService.totalCount
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //The dataSource don't seem to work properly without setTimeout() is removed.I could only find this solution of adding an async delay
      setTimeout(() => {
        this.paginator.length = this.dataService.totalCount
        this.paginator.pageIndex = this.dataService.currentPage
      })
    })
  }

  /**
   * Set the subscription and pagination after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.subscribeToItemsArray();
  }

  pageChange(page: PageEvent) {
    this.dataService.search(this.dataService.currentSearch, page.pageIndex)
  }

  sortData($event: { active: string, direction: string }) {
    this.dataService.search(this.dataService.currentSearch, this.dataService.currentPage, $event.active as Sort, $event.direction as Order)
  }
}

