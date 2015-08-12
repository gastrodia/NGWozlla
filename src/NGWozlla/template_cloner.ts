
import {Injectable, Inject} from 'angular2/angular2';
import {MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN} from './dom_token';
@Injectable()
export class WozllaTemplateCloner {
  maxInMemoryElementsPerTemplate: number;

  constructor(@Inject(MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN) maxInMemoryElementsPerTemplate) {
    console.log('WozllaTemplateCloner');
  }

  prepareForClone(templateRoot: Element): Element | string {
    console.log(templateRoot);
    return templateRoot;
  }

  cloneContent(preparedTemplateRoot: Element | string, importNode: boolean): Node {
    var templateContent;

    return templateContent;
  }
}
