import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { ShopService } from '../../services/shop.service'
import { Shop } from '../../models/shop'
import { SHOP } from '../../constants/routing-map'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {
  shopForm: FormGroup
  currentItem: Shop

  constructor(
    private _formBuilder: FormBuilder,
    private _toolbarService: ToolbarService,
    private _shopService: ShopService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.shopForm = this._formBuilder.group({
      name: ['']
    })
  }

  ngOnInit(): void {
    this._activatedRoute.url.pipe(
      switchMap((url) => this._shopService.getShop$(url.pop().path))
    ).subscribe((item: Shop) => {
        if (item) {
          this.currentItem = item
          this.shopForm.setValue({name: item.name})
          this._toolbarService.changeTitle('edit')
        } else {
          this._toolbarService.changeTitle('new')
        }
      })
  }

  onSubmit() {
    if (this.currentItem) {
      this._shopService.updateShop$(
        this.currentItem.name,
        this.shopForm.value.name).subscribe(() => {
          this._router.navigate(['administration', SHOP])
        })
    } else {
      this._shopService.createShop$(
        this.shopForm.value.name).subscribe(() => {
          this._router.navigate(['administration', SHOP])
        })
    }
  }

  onDelete() {
    this._shopService.deleteShop$(this.currentItem).subscribe(() => {
      this._router.navigate(['administration', SHOP])
    })
  }

}
