import * as fromFiltro from './filter.actions';
import {Todo} from "../todo/model/todo.model";

const estadoIncial: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer( state = estadoIncial,
                              action: fromFiltro.Acciones):fromFiltro.filtrosValidos {
  switch (action.type) {

    case fromFiltro.SET_FILTRO:
      return action.filtro;

    default :
      return state;
  }
}
