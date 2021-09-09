import { Component } from '@angular/core';

import { AgFloatingFilterComponent } from '@ag-grid-community/angular';
import { IFloatingFilterParams } from '@ag-grid-community/core';

@Component({
  selector: 'filter-title',
  template: `&gt;
    <input
      style="width: 30px"
      type="text"
      [(ngModel)]="currentValue"
      (input)="onInputBoxChanged()"
      placeholder="Search by title" />`
})
export class CustomFloatingFilterTitleComponent implements AgFloatingFilterComponent {
  params!: IFloatingFilterParams;
  currentValue: string = "";

  agInit(params: IFloatingFilterParams): void {
    this.params = params;
  }
  onParentModelChanged(parentModel: any) {
    if (!parentModel) {
      this.currentValue = "";
    } else {
      this.currentValue = parentModel
    }
  }
  
  onInputBoxChanged() {
    if (!!!this.currentValue) {
      // Remove the filter
      this.params.parentFilterInstance((instance: any) =>  {
        instance
          .getFrameworkComponentInstance()
          .onChange(null);
      });
      return;
    }
    this.params.parentFilterInstance((instance:any) => {
      instance
        .getFrameworkComponentInstance()
        .onChange(this.currentValue);
    });
  }
}
