declare module dom{
  class DomAdapter{}
  class Parse5DomAdapter extends DomAdapter{}
  function setRootDomAdapter(adapter: DomAdapter);
}


declare module "angular2/dom" {
  export = dom;
}
