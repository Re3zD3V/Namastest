import { TestBed } from '@angular/core/testing';

import { ApiHttpClientInterceptor } from './api-http-client-interceptor';

describe('ApiHttpClientInterceptorService', () => {
  let service: ApiHttpClientInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHttpClientInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
