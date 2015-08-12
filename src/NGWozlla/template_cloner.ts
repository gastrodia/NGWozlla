
import {Injectable, Inject} from 'angular2/angular2';
import {MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN} from './dom_token';
@Injectable()
export class WozllaTemplateCloner {
  maxInMemoryElementsPerTemplate: number;

  constructor(@Inject(MAX_IN_MEMORY_ELEMENTS_PER_TEMPLATE_TOKEN) maxInMemoryElementsPerTemplate) {
    console.log('WozllaTemplateCloner');
    this.maxInMemoryElementsPerTemplate = maxInMemoryElementsPerTemplate;
    console.log(this);
  }

  prepareForClone(templateRoot: Element): Element | string {
    console.log('prepareForClone');
    console.log(templateRoot);
    return templateRoot;
  }

  cloneContent(preparedTemplateRoot: Element | string, importNode: boolean): Node {
    console.log('cloneContent',arguments);
    console.log(preparedTemplateRoot,importNode);
    var templateContent;

    return templateContent;
  }
}
