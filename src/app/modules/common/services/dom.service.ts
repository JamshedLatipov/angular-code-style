import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef, ViewContainerRef,
} from '@angular/core';

@Injectable()
export class DomService {
  private _id: number = 0;
  private _componentRefs: { [key: number]: ComponentRef<any> } = {};

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
  ) {}

  public appendComponentToBody(component: any): number {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this._injector);

    this._appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this._id = this._id + 1;
    this._componentRefs[this._id] = componentRef;
    return this._id;
  }


  public appendComponentEmbeddedToBody(componentRef: EmbeddedViewRef<any>): number {
    const domElem = componentRef.rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this._id = this._id + 1;
    return this._id;
  }

  // public appendComponentRefToBody(componentRef: ViewContainerRef): number {
  //   const domElem = componentRef.rootNodes[0] as HTMLElement;
  //   document.body.appendChild(domElem);
  //   this._id = this._id + 1;
  //   return this._id;
  // }

  public getComponent(id: number): ComponentRef<any> | null {
    if (this._componentRefs[id]) {
      return this._componentRefs[id];
    }
    return null;
  }

  public removeComponentFromBody(id: number): void {
    if (this._componentRefs[id]) {
      this._appRef.detachView(this._componentRefs[id].hostView);
      this._componentRefs[id].destroy();
    }
  }
}
