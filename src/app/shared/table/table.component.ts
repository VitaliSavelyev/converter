import {Component, Input, ViewChild} from '@angular/core';
import {Rate} from "../../interfaces/interfaces";
import {Table} from "primeng/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() rates: Rate[] = []
  @ViewChild('dt') table: Table;

  public filterTable(event: any, field: string, mode: string): void {
    this.table.filter(event.target.value, field, mode);
  }
}
