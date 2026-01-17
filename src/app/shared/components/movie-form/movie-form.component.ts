import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Imov } from '../../models/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit,OnChanges {
@ViewChild('mForm') mForm !: NgForm
@Input() getEdit !: Imov

isInEditMode : boolean = false
@Output() emitAddMovie = new EventEmitter<Imov>()
  @Output() emitUpdateMovie = new EventEmitter<Imov>()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['getEdit']['currentValue']){
      this.isInEditMode = true
      this.mForm.form.patchValue(changes['getEdit']['currentValue'])
    }
  }

  onAdd(){
    if(this.mForm.valid){
      let obj = {
        ...this.mForm.value,
        id : Date.now().toString()
      }

      this.emitAddMovie.emit(obj);
      this.mForm.reset()
    }
  }

  onUpdate(){
    if(this.mForm.valid){
      let obj : Imov = {
        ...this.mForm.value,
        id : this.getEdit.id
      }
      this.emitUpdateMovie.emit(obj);
      this.isInEditMode=false
      this.mForm.reset()
    }
  }

}
