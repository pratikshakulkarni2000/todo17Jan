import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Imov } from '../../models/movie';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input() movies : Array<Imov> = []
  @Output() emitEditMovie = new EventEmitter<Imov>()
  constructor(
    private _dialog : MatDialog,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onRemove(movie : Imov){
    let matconfig = new MatDialogConfig()
    matconfig.width = "500px"
    matconfig.data = `Are you susre to remove it?`
    
    let matconfigRef = this._dialog.open(GetConfirmComponent,matconfig)
    matconfigRef.disableClose = true
    matconfigRef.afterClosed()
      .subscribe(res => {
        if(res){
          let getIndex = this.movies.findIndex(m => m.id === movie.id)
          this.movies.splice(getIndex,1)


          this._snackBar.open(`Removed successfully !!!`,"Close",{
            horizontalPosition  : 'end',
            verticalPosition : 'top',
            duration : 3000
          })
        }
      })
  }


  onEdit(e:Imov){
    this.emitEditMovie.emit(e)
  }

}
