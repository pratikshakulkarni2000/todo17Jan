import { Component, OnInit } from '@angular/core';
import { todoData } from '../../consts/todo';
import { Itodo } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {


  todoArr : Array<Itodo> = todoData
  editTodo !: Itodo
  getData(t : Itodo){
    this.todoArr.push(t)

    this._snackbar.open(`TodoItem added successfully !!!`,"Close",{
      horizontalPosition : 'end',
      verticalPosition : 'top',
      duration : 3000
    })
  }

  constructor(
    private _snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getEdit(t :Itodo){
    this.editTodo = t
  }

  getUpdate(u:Itodo){
    let getIndex = this.todoArr.findIndex(t => t.id === u.id)
    this.todoArr[getIndex] = u 

    this._snackbar.open(`Updated successfully!!!`,
      "Close",
      {
        horizontalPosition : 'end',
        verticalPosition : 'top',
        duration : 3000
      }
    )
  }

}
