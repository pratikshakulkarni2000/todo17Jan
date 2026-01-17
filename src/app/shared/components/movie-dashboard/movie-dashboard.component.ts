import { Component, OnInit } from '@angular/core';
import { Imov } from '../../models/movie';
import { Movies } from '../../consts/movie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {

  moviesArr : Array <Imov> = Movies
  editMovie !: Imov
  constructor(
    private _snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getAddMovie( m: Imov){
    this.moviesArr.push(m)

    this._snackbar.open(`Added successfully!!!`,"Close",{
      horizontalPosition : 'left',
      verticalPosition : 'top',
      duration : 3000
    })
  }

  getEditMovie(m : Imov){
    this.editMovie=m
  }

  getUpdateMovie(u : Imov){
    let getIndex = this.moviesArr.findIndex(up => up.id === u.id)
    this.moviesArr[getIndex] = u

    this._snackbar.open(`Updated successfully`,"close",{
      horizontalPosition : 'end',
      verticalPosition : 'top',
      duration : 3000
    })
  }

}
