import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from "@angular/core";

@Injectable()
export class DynamicLoaderService {

  private readonly body: HTMLBodyElement;
  private readonly resolver: ComponentFactoryResolver;
  private readonly appRef: ApplicationRef;


  constructor(private injector: Injector) {
    this.resolver = this.injector.get(ComponentFactoryResolver);
    this.appRef = this.injector.get(ApplicationRef);
    this.body = document.querySelector('body');
  }


  bound<T>(componentType: Type<T>): ComponentRef<T> {
    const cmptFactory = this.resolver.resolveComponentFactory(componentType);
    return this.create(cmptFactory);
  }


  destroy(dialog: any): void {
    this.body.removeChild((dialog.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    this.appRef.detachView(dialog.hostView);
  }


  private create<T>(
    cmptFactory: ComponentFactory<T>,
  ): ComponentRef<T> {
    const cmptRef = cmptFactory.create(this.injector);
    this.appRef.attachView(cmptRef.hostView);
    this.body.appendChild((cmptRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    return cmptRef;
  }


}


