import { TestBed } from '@angular/core/testing';
import { ComponentFactoryResolver } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { Injector } from '@angular/core';
import { EmbeddedViewRef } from '@angular/core';
import { DomService } from './dom.service';

describe('DomService', () => {
  let service: DomService;

  beforeEach(() => {
    const componentFactoryResolverStub = () => ({
      resolveComponentFactory: component => ({
        create: () => ({ hostView: { rootNodes: {} } })
      })
    });
    const applicationRefStub = () => ({
      attachView: hostView => ({}),
      detachView: hostView => ({})
    });
    const injectorStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        DomService,
        {
          provide: ComponentFactoryResolver,
          useFactory: componentFactoryResolverStub
        },
        { provide: ApplicationRef, useFactory: applicationRefStub },
        { provide: Injector, useFactory: injectorStub }
      ]
    });
    service = TestBed.inject(DomService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
