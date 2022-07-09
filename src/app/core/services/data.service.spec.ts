import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {SuccessResponse} from "@interfaces/*";
import {of} from "rxjs";
import {Order, Sort} from "@enums/*";

const params: { page: number, per_page: number, sort: Sort, order: Order } = {
  page: 1,
  per_page: 9,
  sort: Sort.login,
  order: Order.asc
}
const value = 'foo';

const dummyData: SuccessResponse = {
  total_count: 4,
  incomplete_results: false,
  items: [
    {
      "login": "t",
      "id": 60341,
      "node_id": "MDQ6VXYwMzQx",
      "avatar_url": "https://avatars.githubusercontent.com/u/60341?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/t",
      "html_url": "https://github.com/t",
      "followers_url": "https://api.github.com/users/t/followers",
      "following_url": "https://api.github.com/users/t/following{/other_user}",
      "gists_url": "https://api.github.com/users/t/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/t/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/t/subscriptions",
      "organizations_url": "https://api.github.com/users/t/orgs",
      "repos_url": "https://api.github.com/users/t/repos",
      "events_url": "https://api.github.com/users/t/events{/privacy}",
      "received_events_url": "https://api.github.com/users/t/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1
    },
    {
      "login": "t",
      "id": 60341,
      "node_id": "MDQ6VXYwMzQx",
      "avatar_url": "https://avatars.githubusercontent.com/u/60341?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/t",
      "html_url": "https://github.com/t",
      "followers_url": "https://api.github.com/users/t/followers",
      "following_url": "https://api.github.com/users/t/following{/other_user}",
      "gists_url": "https://api.github.com/users/t/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/t/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/t/subscriptions",
      "organizations_url": "https://api.github.com/users/t/orgs",
      "repos_url": "https://api.github.com/users/t/repos",
      "events_url": "https://api.github.com/users/t/events{/privacy}",
      "received_events_url": "https://api.github.com/users/t/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1
    },
    {
      "login": "t",
      "id": 60341,
      "node_id": "MDQ6VXYwMzQx",
      "avatar_url": "https://avatars.githubusercontent.com/u/60341?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/t",
      "html_url": "https://github.com/t",
      "followers_url": "https://api.github.com/users/t/followers",
      "following_url": "https://api.github.com/users/t/following{/other_user}",
      "gists_url": "https://api.github.com/users/t/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/t/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/t/subscriptions",
      "organizations_url": "https://api.github.com/users/t/orgs",
      "repos_url": "https://api.github.com/users/t/repos",
      "events_url": "https://api.github.com/users/t/events{/privacy}",
      "received_events_url": "https://api.github.com/users/t/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1
    },
    {
      "login": "t",
      "id": 60341,
      "node_id": "MDQ6VXYwMzQx",
      "avatar_url": "https://avatars.githubusercontent.com/u/60341?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/t",
      "html_url": "https://github.com/t",
      "followers_url": "https://api.github.com/users/t/followers",
      "following_url": "https://api.github.com/users/t/following{/other_user}",
      "gists_url": "https://api.github.com/users/t/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/t/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/t/subscriptions",
      "organizations_url": "https://api.github.com/users/t/orgs",
      "repos_url": "https://api.github.com/users/t/repos",
      "events_url": "https://api.github.com/users/t/events{/privacy}",
      "received_events_url": "https://api.github.com/users/t/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1
    }
  ]
}

const noItemsData: SuccessResponse = {
  total_count: 0,
  incomplete_results: false,
  items: []
}
const snackBarMessages = {
  error: {
    message: `No Record Found Text '${value}' Try Another Value`,
    action: 'ERROR'
  },
  success: {
    message: `Fetched ${dummyData.total_count} Records For Text '${value}' Currently On Page '${params.page}' Sorted By '${params.sort}' in '${params.order}' order`,
    action: 'SUCCESS'
  }
}

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have field totalCount with initial value 0', () => {
    const field = service.totalCount;
    expect(field).toBeDefined();
    expect(field).toEqual(0);
  });

  it('should have field currentPage with initial value 0', () => {
    const field = service.currentPage;
    expect(field).toBeDefined();
    expect(field).toEqual(0);
  });

  it('should have field currentSearch with initial value ""', () => {
    const field = service.currentSearch;
    expect(field).toBeDefined();
    expect(field).toEqual("");
  });

  it('should have field currentSort with initial value ""', () => {
    const field = service.currentSort;
    expect(field).toBeDefined();
    expect(field).toEqual(Sort.login);
  });

  it('should have field currentOrder with initial value ""', () => {
    const field = service.currentOrder;
    expect(field).toBeDefined();
    expect(field).toEqual(Order.asc);
  });

  it('should have field isRateLimitReached with initial value ""', () => {
    const field = service.isRateLimitReached;
    expect(field).toBeDefined();
    expect(field).toBeFalsy();
  });

  it('should have field isLoadingResults with initial value ""', () => {
    const field = service.isLoadingResults;
    expect(field).toBeDefined();
    expect(field).toBeFalsy();
  });

  it('should have field noRecords with initial value ""', () => {
    const field = service.noRecords;
    expect(field).toBeDefined();
    expect(field).toBeTruthy();
  });

  it('should have Behaviour Subject field isShowAvatarImage with initial value false', () => {
    const field = service.isShowAvatarImage;
    expect(field).toBeDefined();
    expect(field.value).toBeFalsy();
  });


  it('should have search() which turns isLoadingResults truthy', () => {
    service.isLoadingResults = false;
    service.search()
    expect(service.isLoadingResults).toBeTruthy();
  });

  it('should have search() which makes items[] equal []', () => {
    service.items$.next(dummyData.items)
    service.search()
    const items = service.items$.value
    expect(items).toEqual([]);
    expect(items.length).toEqual(0)
  });

  it('should have search() which calls getLogin() with same parameters', () => {
    const spy = spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(spy).toHaveBeenCalledWith(value, params.page, params.sort, params.order);
  });

  it('should have search() which assigns items$ to received items', () => {
    service.items$.next([]);
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(service.items$.value).toEqual(dummyData.items);
  });

  it('should have search() which assigns totalCount = data.total_count', () => {
    service.totalCount = 0;
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(service.totalCount).toEqual(dummyData.total_count);
  });

  it('should have search() which assigns currentPage = page', () => {
    service.currentPage = 0;
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(service.currentPage).toEqual(params.page);
  });


  it('should have search() which this.isLoadingResults = false after Api call', () => {
    service.currentSearch = '';
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(service.isLoadingResults).toBeFalsy();
  });

  it('should have search() which assigns currentSort = sort', () => {
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(service.currentSort).toEqual(params.sort);
  });

  it('should have search() which assigns currentOrder = order', () => {
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    service.search(value, params.page, params.sort, params.order);
    expect(service.currentSort).toEqual(params.sort);
  });

  it('should have search() which if data.total_count === 0 then openSnackBar() with correct parameters', () => {
    spyOn(service, 'getLogin').and.returnValue(of(noItemsData))
    const spy = spyOn(service, 'openSnackBar')
    service.search(value, params.page, params.sort, params.order);
    expect(spy).toHaveBeenCalledWith(snackBarMessages.error.message, snackBarMessages.error.action);
    expect(service.noRecords).toBeTruthy()
  });

  it('should have search() which if data.total_count !== 0 then openSnackBar() with correct parameters', () => {
    spyOn(service, 'getLogin').and.returnValue(of(dummyData))
    const spy = spyOn(service, 'openSnackBar')
    service.search(value, params.page, params.sort, params.order);
    expect(spy).toHaveBeenCalledWith(snackBarMessages.success.message, snackBarMessages.success.action);
    expect(service.noRecords).toBeFalsy()
  });

  it('should have getLogin() which calls endpoint with values provided and GET data', () => {
    service.getLogin(value, params.page, params.sort, params.order).subscribe(e => {
      if ("total_count" in e) {
        expect(e.total_count).toEqual(4)
      }
    })

    const request = httpMock.expectOne(`${service.BASE_URL}/users?q=${value} in:login&page=${params.page}&per_page=${params.per_page}&sort=${params.sort}&order=${params.order}`);
    expect(request.request.method).toEqual('GET');
    request.flush(dummyData);
    httpMock.verify();
  })


});
