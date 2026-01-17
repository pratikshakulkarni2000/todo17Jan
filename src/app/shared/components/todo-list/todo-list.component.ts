import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itodo } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() getData: Array<Itodo> = [];

  @Output() emitEditTodo = new EventEmitter<Itodo>();

  constructor(
    private _matdialog: MatDialog,
    private _snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  onRemove(todo: Itodo) {
    let matConfig = new MatDialogConfig();
    matConfig.width = '500px';
    matConfig.data = `Are you sure to remove todoItem !!!`;

    let matDialogConfig = this._matdialog.open(GetConfirmComponent, matConfig);
    matDialogConfig.disableClose = true;
    matDialogConfig.afterClosed().subscribe((res) => {
      if (res) {
        let getIndex = this.getData.findIndex((t) => t.id === todo.id);
        this.getData.splice(getIndex, 1);

        this._snackbar.open(`Removed successfully !!!`, 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    });
  }

  onEdit(todo: Itodo) {
    this.emitEditTodo.emit(todo);
  }
}
