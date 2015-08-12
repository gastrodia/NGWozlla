import {OpaqueToken} from 'angular2/angular2';

export function CONST_EXPR<T>(expr: T): T {
  return expr;
}



export const MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN: OpaqueToken =
    CONST_EXPR(new OpaqueToken('MaxInMemoryElementsPerTemplate'));
 
