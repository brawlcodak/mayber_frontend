import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { User } from 'src/app/core/states/user/user.actions';

@Component({
  selector: 'app-info-error',
  templateUrl: './info-error.component.html',
  styleUrls: ['./info-error.component.scss']
})
export class InfoErrorComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<InfoErrorComponent>
  ) {
    this.createForm()
   }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this._formBuilder.group({
      id: 0,
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      user_id: 1,
    })
  }

  onSendReport() {
    const data = this.form.getRawValue();
    delete data.id;
    this.store.dispatch(new User.ReportError(data)).toPromise().finally(() => {
      this.dialogRef.close();
    })
  }

}
