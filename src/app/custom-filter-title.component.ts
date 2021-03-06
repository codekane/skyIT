import {Component, ViewChild, ViewContainerRef} from "@angular/core";

import {
  IAfterGuiAttachedParams, 
  IDoesFilterPassParams, 
  IFilterParams, 
  RowNode
} from "ag-grid-community";

import {IFilterAngularComp} from "ag-grid-angular";

@Component({
  selector: 'filter-title',
  template: `
    <div class="container">
      Custom Filter: <input #input (ngModelChange)="onChange($event)"
      [ngModel]="text" class="form-control" placeholder="Search by title">
    </div>`
  , styles: [
    `
      .container {
        border: 2px solid #22ff22;
        border-radius: 5px;
        background-color: #bbffbb;
        width: 200px;
        height: 50px;
      }
      input { height: 20px; }
    `
  ]
})

export class CustomFilterTitleComponent implements IFilterAngularComp {
  private params!: IFilterParams;
  private valueGetter!: (rowNode: RowNode) => any;
  public text: string = '';

  @ViewChild('input', { read: ViewContainerRef}) public input:any;

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return this.text !== null && this.text !== undefined && this.text !== '';
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.text.toLowerCase()
      .split(" ")
      .every((filterWord) => {
        return this.valueGetter(params.node).toString().toLowerCase()
          .indexOf(filterWord) >= 0;
      });
  }

  getModel(): any {
    return { value: this.text };
  }

  setModel(model: any): void {
    this.text = model ? model.value : '';
  }

  ngAfterViewInit(params: IAfterGuiAttachedParams): void {
    setTimeout(() => {
      this.input.element.nativeElement.focus();
    })
  }

  onChange(newValue:any): void {
    if (this.text !== newValue) {
      this.text = newValue;
      this.params.filterChangedCallback();
    }
  }
}
