import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from "../model/todo.model";
import {FormControl, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducers";
import {BorrarTodoAction, EditarTodoAction, ToggleTodoAction} from "../todo.actions";
import {store} from "@angular/core/src/render3/instructions";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges
      .subscribe(valor => {
        const accion = new ToggleTodoAction(this.todo.id);
        this.store.dispatch(accion);
      });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();

    }, 1);
  }

  terminarEdicion() {
    const valor = this.txtInput.value
    this.editando = false;
    if(this.txtInput.invalid || valor===this.todo.texto) {
      return
    }
    const accion = new EditarTodoAction(this.todo.id, valor);
    this.store.dispatch(accion);
  }

  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}
