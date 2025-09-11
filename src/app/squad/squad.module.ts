import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SquadRoutingModule } from './squad-routing.module';
import { SquadCatalogComponent } from './squad-catalog/squad-catalog.component';
import {CART_OPTIONS_TOKEN, CartService, CartOptions} from '@shared/cart/cart.service';
import {IProductsServiceToken} from '@shared/products-service.interface';
import {EngineersService} from './engineers.service';


@NgModule({
  declarations: [SquadCatalogComponent],
  imports: [SharedModule, SquadRoutingModule],
  providers: [
    {
      provide: CART_OPTIONS_TOKEN,
      useValue: {
        persistenceType: 'local',
        persistenceKey: 'squad-cart'
      }
    },
    {
      provide: CartService,
      useFactory: (options: CartOptions) => new CartService(options),
      deps: [CART_OPTIONS_TOKEN],
      multi: false
    },
    {
      provide: IProductsServiceToken,
      useValue: EngineersService,
    }
  ],
})
export class SquadModule { }
