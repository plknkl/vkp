import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { ShiftService } from '../../services/shift.service'
import { ShopService } from '../../services/shop.service'
import { Shift } from '../../models/shift'
import { Shop } from '../../models/shop'
import { SHIFT } from '../../constants/routing-map'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-shift-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.scss']
})
export class ShiftEditComponent implements OnInit {
  shiftForm: FormGroup
  currentItem: Shift
  shops: Shop[]

  constructor(
    private _formBuilder: FormBuilder,
    private _toolbarService: ToolbarService,
    private _shiftService: ShiftService,
    private _shopService: ShopService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.shiftForm = this._formBuilder.group({
      name: [''],
      shop: ['']
    })
  }

  ngOnInit(): void {

    this._shopService.getShops$().subscribe((shops: Shop[]) => {
      this.shops = shops
    })

    this._activatedRoute.url.pipe(
      switchMap((url) => this._shiftService.getShift$(url.pop().path))
    ).subscribe((item: Shift) => {
        if (item) {
          this.currentItem = item
          this.shiftForm.setValue({name: item.name, shop: item.shop.name})
          this._toolbarService.changeTitle('edit')
        } else {
          this._toolbarService.changeTitle('new')
        }
      })
  }

  onSubmit() {
    if (this.currentItem) {
      this._shiftService.updateShift$(
        this.currentItem.name,
        this.shiftForm.value.name,
        this.shiftForm.value.shop).subscribe(() => {
          this._router.navigate(['administration', SHIFT])
        })
    } else {
      this._shiftService.createShift$(
        this.shiftForm.value.name,
        this.shiftForm.value.shop).subscribe(() => {
          this._router.navigate(['administration', SHIFT])
        })
    }
  }

  onDelete() {
    this._shiftService.deleteShift$(this.currentItem).subscribe(() => {
      this._router.navigate(['administration', SHIFT])
    })
  }

}
