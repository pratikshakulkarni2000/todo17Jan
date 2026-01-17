import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {

  @ViewChild ('todoForm') todoForm !: NgForm
  @Input() getEditTodo !: Itodo
  @Output() emitAddTodo : EventEmitter <Itodo> = new EventEmitter<Itodo>()
  isInEditMode : boolean = false

  @Output() emitUpdateTodo = new EventEmitter<Itodo>()
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['getEditTodo']['currentValue']){
      this.isInEditMode = true
      this.todoForm.form.patchValue(changes['getEditTodo']['currentValue'])
    }
  }

  onAdd(){
    if(this.todoForm.valid){
      let obj = {
        ...this.todoForm.value,
        id : Date.now().toString()
      }

      this.emitAddTodo.emit(obj)
    }
  }

  onUpdate(){
    if(this.todoForm.valid){
      let obj : Itodo = {
        ...this.todoForm.value,
        id : this.getEditTodo.id
      }

      this.emitUpdateTodo.emit(obj)
      this.isInEditMode = false
      this.todoForm.reset()
    }
  }

}
