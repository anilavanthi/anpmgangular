import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MemberShipService } from './membership.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MemberShip } from './membership.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddMemberShipFormComponent } from './add/add-form/add-form.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from './../../../shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class  MemberShipComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'planname',
    'plantype',
    'duration',
    'contactsno',
    'amount',
    'status',
    'smsenable',
    'emailenable',
    'personalassistance',
    'photozoom',
    'sendinterest',
    'profilesuggestions',
    'actions',
  ];
  exampleDatabase?:  MemberShipService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<MemberShip>(true, []);
  id?: number;
  membership?: MemberShip;
  breadscrums = [
    {
      title: 'All MemberShip',
      items: [' MemberShip'],
      active: 'All',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public membershipService:  MemberShipService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddMemberShipFormComponent, {
      data: {
        membership: this.membership,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase?.dataChange.value.push(
          {...this.membershipService.getDialogData(), status: 1}
        );
        /* this.exampleDatabase?.dataChange.value.unshift(
           {...this.countryService.getDialogData(), status: 1}
         );*/
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add MemberShip Successfully...!!!',
          'top',
          'center'
        );
      }
    });
  }
  editCall(row: MemberShip) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddMemberShipFormComponent, {
      data: {
        membership: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)

        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.membershipService.getDialogData();
          // And lastly refresh table

          this.refreshTable();
          this.showNotification(
            'snackbar-success',
            'Edit MemberShip Successfully...!!!',
            'top',
            'center'
          );
        }
      }
    });
  }

  deleteItem(row: MemberShip) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    /* const dialogRef = this.dialog.open(DeleteDialogComponent, {
       data: row,
       direction: tempDirection,
     });*/
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      (x) => x.id === this.id
    );
    // for delete we use splice in order to remove single object from DataService
    if (foundIndex != null && this.exampleDatabase) {
      this.membershipService.deleteMemberShip(this.id);
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.showNotification(
        'snackbar-danger',
        'Delete MemberShip Successfully...!!!',
        'top',
        'center'
      );
    }
    //   }
    // });
  }

  statusItem(row: MemberShip,type:string) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    // const dialogRef = this.dialog.open(ConfirmDialog, {
    //   data: row,
    //   direction: tempDirection,
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      (x) => x.id === this.id
    );
    // for delete we use splice in order to remove single object from DataService
    if (foundIndex != null && this.exampleDatabase) {
      this.membershipService.statusMemberShip(this.id,type);
      // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.showNotification(
        'snackbar-info',
        'Status MemberShip Successfully...!!!',
        'top',
        'center'
      );
    }
    //  }
    // });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      console.log(item.id);
      this.deleteItem(item);
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      // this.exampleDatabase?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<MemberShip>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new  MemberShipService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
         'Plan Name': x.planname,
         'Plan Type': x.plantype,
         'Duration': x.duration,
         'No. of Contacts': x.contactsno,
         'Amount': x.amount,
        'Status': x.status,
        'SMS Enable': x.smsenable,
        'Email Enable': x.emailenable,
        'Personal Assitance Enable': x.personalassistance,
        'Photo Zoom Enable': x.photozoom,
        'Send Interest Enable': x.sendinterest,
        'Profile Suggestions Enable': x.profilesuggestions,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item:  MemberShip) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class ExampleDataSource extends DataSource<MemberShip> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData:  MemberShip[] = [];
  renderedData:  MemberShip[] = [];
  constructor(
    public exampleDatabase:  MemberShipService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MemberShip[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getMemberShip();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((membership:  MemberShip) => {
            const searchStr = (
              membership.planname +
              membership.plantype +
              membership.duration +
              membership.contactsno +
              membership.amount +
              membership.status +
              membership.smsenable +
              membership.emailenable +
              membership.personalassistance +
              membership.photozoom +
              membership.sendinterest +
              membership.profilesuggestions
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    // disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: MemberShip[]):  MemberShip[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'planname':
          [propertyA, propertyB] = [a.planname, b.planname];
          break;
        case 'plantype':
          [propertyA, propertyB] = [a.plantype, b.plantype];
            break;
        case 'duration':
          [propertyA, propertyB] = [a.duration, b.duration];
            break;
        case 'contactsno':
          [propertyA, propertyB] = [a.contactsno, b.contactsno];
            break;
        case 'amount':
          [propertyA, propertyB] = [a.amount, b.amount];
            break;
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
          break;
        case 'smsenable':
          [propertyA, propertyB] = [a.smsenable, b.smsenable];
          break;
        case 'emailenable':
          [propertyA, propertyB] = [a.emailenable, b.emailenable];
          break;
        case 'personalassistance':
          [propertyA, propertyB] = [a.personalassistance, b.personalassistance];
          break;
        case 'photozoom':
          [propertyA, propertyB] = [a.photozoom, b.photozoom];
          break;
        case 'sendinterest':
          [propertyA, propertyB] = [a.sendinterest, b.sendinterest];
          break;  
        case 'profilesuggestions':
          [propertyA, propertyB] = [a.profilesuggestions, b.profilesuggestions];
          break; 
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
