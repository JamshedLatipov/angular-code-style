import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ISettingsConfigs } from '../interfaces/default-settings.interface';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    const iSettingsConfigsStub = () => ({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SettingsService,
        { provide: ISettingsConfigs, useFactory: iSettingsConfigsStub }
      ]
    });
    service = TestBed.inject(SettingsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.load().subscribe(res => {
        expect(res).toEqual();
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush();
      httpTestingController.verify();
    });
  });
});
