import {Component, OnInit} from '@angular/core';
import {filtrosValidos, SetFiltroAction} from "../../filter/filter.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducers";
import {Todo} from "../model/todo.model";
import {BorrarAllTodoAction} from "../todo.actions";

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: filtrosValidos;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevoFiltro: filtrosValidos) {
    const accion = new SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }


  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length
  }

  limpiarCompletados() {
    const accion = new BorrarAllTodoAction();
    this.store.dispatch(accion);
  }

}
