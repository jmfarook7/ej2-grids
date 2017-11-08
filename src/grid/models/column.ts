import { merge } from '@syncfusion/ej2-base';
import { NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { ICellFormatter, IFilterUI, IEditCell, CommandModel, IFilter } from '../base/interface';
import { TextAlign, ClipMode } from '../base/enum';
import { ValueFormatter } from '../services/value-formatter';
import { ValueAccessor } from '../base/type';
import { getUid, templateCompiler } from '../base/util';

/**
 * Represents Grid `Column` model class.
 */
export class Column {
    /**    
     * Defines the field name of column which is mapped with mapping name of DataSource.  
     * The bounded columns can be sort, filter and group etc., 
     * The `field` name must be a valid JavaScript identifier, 
     * the first character must be an alphabet and should not contain spaces and special characters.
     * @default undefined    
     */

    public field: string;

    /**    
     * Gets the unique identifier value of column. It is used to get column object.   
     * @default undefined    
     */

    public uid: string;

    /**    
     * Defines the header text of column which is used to display in column header.    
     * If `headerText` is not defined, then field name value will be assigned to header text.   
     * @default undefined    
     */

    public headerText: string;

    /**    
     * Defines the width of column in pixels or percentage.    
     * @default undefined    
     */

    public width: string | number;

    /**    
     * Defines the minimum Width of column in pixels or percentage.    
     * @default undefined    
     */
    public minWidth: string | number;

    /**    
     * Defines the maximum width of column in pixels or percentage.    
     * @default undefined    
     */
    public maxWidth: string | number;

    /**    
     * Define the alignment of column in both header and content cells.    
     * @default left  
     */

    public textAlign: TextAlign;

    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `clip` -  Truncates the cell content when it overflows its area. 
     * * `ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `ellipsiswithtooltip` - Displays ellipsis when the cell content overflows its area 
     * also it will display tooltip while hover on ellipsis applied cell.
     * @default ellipsis
     */
    public clipMode: ClipMode;

    /**   
     * Define the alignment of column header which is used to align the text of column header.       
     * @default left  
     * @hidden  
     */
    public headerTextAlign: TextAlign;

    /**    
     * If `disableHtmlEncode` set to true, then it encodes the html of header and content cells.  
     * @default false    
     */

    public disableHtmlEncode: boolean;

    /**    
     * Defines the data type of column.    
     * @default null    
     */

    public type: string;

    /**    
     * It is used to change display value with the given format and does not affect the original data.  
     * Gets the format from the user which can be standard or custom 
     * [`number`](http://ej2.syncfusion.com/documentation/base/intl.html#number-formatter-and-parser) 
     * and [`date`](http://ej2.syncfusion.com/documentation/base/intl.html#date-formatter-and-parser) formats.  
     * @default null    
     */

    public format: string | NumberFormatOptions | DateFormatOptions;

    /**    
     * If `visible` set to false, then hide the particular column. By default all columns are displayed.  
     * @default true    
     */
    public visible: boolean;

    /**    
     * Defines the column template as string or HTML element ID which is used to add customized element in each cells of the column.       
     * @default null    
     */

    public template: string;

    /**        
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.     
     * @default null
     */

    public headerTemplate: string;

    /**    
     * If `allowSorting` set to false, then it disables sorting option of a particular column.    
     * By default all columns are sortable. 
     * @default true    
     */

    public allowSorting: boolean = true;

    /**    
     * If `allowResizing` set to false, then it disables resize option of a particular column.  
     * By default all columns can be resized. 
     * @default true    
     */

    public allowResizing: boolean = true;

    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column. 
     * By default all columns are filterable.      
     * @default true    
     */

    public allowFiltering: boolean = true;

    /**    
     * If `allowGrouping` set to false, then it disables grouping of a particular column. 
     * By default all columns are groupable.   
     * @default true   
     */

    public allowGrouping: boolean = true;

    /**         
     * If `showColumnMenu` set to false, then it disable the column menu of a particular column.  
     * By default column menu will show for all columns
     * @default true    
     */

    public showColumnMenu: boolean = true;

    /**    
     * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values.     
     * @default true   
     */

    public enableGroupByFormat: boolean = false;

    /**    
     * If `allowEditing` set to false, then it disables editing of a particular column. 
     * By default all columns are editable. 
     * @default true   
     */

    public allowEditing: boolean = true;

    /**    
     * User can customize css styles and attributes of the content cells of a particular column. 
     *  
     * ```html 
     * <div id="Grid"></div>  
     * ``` 
     * ```typescript
     * let gridObj: Grid = new Grid({ 
     * dataSource: filterData, 
     * columns: [ 
     *    { field: 'OrderID', headerText: 'Order ID' }, 
     *    { 
     *        field: 'EmployeeID', headerText: 'Employee ID', customAttributes: { 
     *           class: 'employeeid', 
     *           type: 'employee-id-cell' 
     *      } 
     *   }] 
     * }); 
     * gridObj.appendTo('#Grid'); 
     * ``` 
     *  
     * @default null   
     */

    public customAttributes: { [x: string]: Object };

    /**    
     * If `displayAsCheckBox` set as true, then it displays column value as check box instead of boolean values.    
     * @default true    
     */

    public displayAsCheckBox: boolean;

    /**    
     * Defines the `dataSource` of the column which is used to bind the foreign key data source.    
     * @default null    
     * @hidden   
     */

    public dataSource: Object;

    /**    
     * Defines the method which is used to achieve custom formatting from an external function. 
     * This function triggers before rendering of each cell.  
     *   
     * ```html
     * <div id="Grid"></div>  
     * ```
     * ```typescript
     * class ExtendedFormatter implements ICellFormatter { 
     * public getValue(column: Column, data: Object): Object { 
     *   return '<span style="color:' + (data['Verified'] ? 'green' : 'red') + '"><i>' + data['Verified'] + '</i><span>'; 
     * } 
     * } 
     * let gridObj: Grid = new Grid({ 
     *     dataSource: filterData, 
     *     columns: [ 
     *         { field: 'ShipName', headerText: 'Ship Name' }, 
     *         { field: 'Verified', headerText: 'Verified Status', formatter: ExtendedFormatter }] 
     * }); 
     * gridObj.appendTo('#Grid'); 
     * ``` 
     *  
     * @default null   
     */
    public formatter: { new(): ICellFormatter } | ICellFormatter | Function;

    /**    
     * Defines the method which is used to apply custom cell values from external function and display this on each cells of render.     
     *     
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * let gridObj: Grid = new Grid({
     * dataSource: [{ EmployeeID: 1, EmployeeName: ['John', 'M'] }, { EmployeeID: 2, EmployeeName: ['Peter', 'A'] }],
     * columns: [
     *     { field: 'EmployeeID', headerText: 'Employee ID' },
     *     { field: 'EmployeeName', headerText: 'Employee First Name', 
     *       valueAccessor: (field: string, data: Object, column: Column) => {
     *             return data['EmployeeName'][0];
     *         },
     *     }]
     * }); 
     * ```
     *  
     * @default null    
     */

    public valueAccessor: ValueAccessor;

    /**    
     * The `filterBarTemplate` is used to add a custom component instead of default input component for filter bar.   
     * It have create and read functions.  
     * * create – It is used for creating custom components.  
     * * read – It is used to perform custom filter action. 
     *  
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript  
     * let gridObj: Grid = new Grid({ 
     * dataSource: filterData, 
     * columns: [ 
     *   { field: 'OrderID', headerText: 'Order ID' }, 
     *   { 
     *      field: 'EmployeeID', filterBarTemplate: { 
     *         create: (args: { element: Element, column: Column }) => {                     
     *              let input: HTMLInputElement = document.createElement('input'); 
     *              input.id = 'EmployeeID'; 
     *              input.type = 'text'; 
     *              return input; 
     *         }, 
     *         write: (args: { element: Element, column: Column }) => {                     
     *             args.element.addEventListener('input', args.column.filterBarTemplate.read as EventListener); 
     *         }, 
     *         read: (args: { element: HTMLInputElement, columnIndex: number, column: Column }) => { 
     *             gridObj.filterByColumn(args.element.id, 'equal', args.element.value); 
     *        } 
     *     } 
     *  }], 
     *   allowFiltering: true 
     * }); 
     * gridObj.appendTo('#Grid'); 
     * ```
     *  
     * @default null    
     */

    public filterBarTemplate: IFilterUI;

    /**
     *  It is used to customize the default filter options for a specific columns. 
     * * type -  Specifies the filter type as menu or checkbox.
     * * ui - to render custom component for specific column it has following functions.
     * * create – It is used for creating custom components. 
     * * read -  It is used for read the value from the component.
     * * write - It is used to apply component model as dynamically.
     * 
     *  ``` html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * let gridObj: Grid = new Grid({ 
     * dataSource: filterData, 
     * allowFiltering: true,
     * filterSettings: { type: 'menu'},
     *  columns: [
     *      {
     *          field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right', filter: {
     *              ui: {
     *                  create: (args: { target: Element, column: Object }) => {
     *                      let db: Object = new DataManager(data);
     *                      let flValInput: HTMLElement = createElement('input', { className: 'flm-input' });
     *                      args.target.appendChild(flValInput);
     *                      this.dropInstance = new DropDownList({
     *                          dataSource: new DataManager(data),
     *                          fields: { text: 'OrderID', value: 'OrderID' },
     *                          placeholder: 'Select a value',
     *                          popupHeight: '200px'
     *                      });
     *                      this.dropInstance.appendTo(flValInput);
     *                  },
     *                  write: (args: {
     *                      column: Object, target: Element, parent: any,
     *                      filteredValue: number | string
     *                  }) => {
     *                      this.dropInstance.value = args.filteredValue;
     *                  },
     *                  read: (args: { target: Element, column: any, operator: string, fltrObj: Filter }) => {
     *                      args.fltrObj.filterByColumn(args.column.field, args.operator, this.dropInstance.value);
     *
     *                  }
     *              }
     *          }
     *      },
     *      { field: 'CustomerID', headerText: 'Customer Name', width: 150 },
     *      { field: 'EmployeeID', headerText: 'Employee ID', width: 150 },
     *      {
     *          field: 'ShipCountry', headerText: 'Ship Country', filter: {
     *              type: 'checkbox'
     *          }, width: 150
     *      }
     *  ]
     * }); 
     * gridObj.appendTo('#Grid'); 
     * ```
     * 
     *  @default null
     */

    public filter: IFilter = {};

    /**    
     * It is used to render multiple header rows(stacked headers) on the Grid header.      
     * @default null    
     */

    public columns: Column[] | string[] | ColumnModel[];

    /**    
     * Defines the tool tip text for stacked headers.    
     * @default null    
     * @hidden   
     */
    public toolTip: string;

    /**    
     * If `isPrimaryKey` set to true, then consider this column as primary key constraint.   
     * @default false         
     */
    public isPrimaryKey: boolean;

    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.
     * @default undefined
     */
    public hideAtMedia?: string;


    /**
     * If `showInColumnChooser` set to false, then hide the particular column in column chooser.
     *  By default all columns are displayed in column Chooser.
     * @default true 
     */
    public showInColumnChooser?: boolean = true;

    /**    
     * Defines the type of component for editable.
     * @default stringedit         
     */
    public editType: string;

    /**    
     * Defines rules to validate data before create and update.
     * @default null         
     */
    public validationRules: Object;

    /**    
     * Defines the default values for component while adding a new record to the Grid.
     * @default null         
     */
    public defaultValue: string;

    /**    
     * Defines the `IEditCell` object to customize default edit cell.
     * @default {}         
     */
    public edit: IEditCell;

    /**    
     * If `isIdentity` is set to true, then this column is considered as identity column.
     * @default false         
     */
    public isIdentity: boolean;

    /**    
     * To define foreign key field name of the grid datasource.
     * @hidden
     * @default null         
     */
    public foreignKeyValue: string;

    /**
     * @hidden
     * Defines the commands column template as string or HTML element ID which is used to add
     * customized command buttons in each cells of the column.        
     */
    public commandsTemplate: string;

    /**
     * `commands` provides an option to display command buttons in every cell.
     * The available built-in command buttons are
     * * edit - Edit the record.
     * * delete - Delete the record.
     * * save - Save the record.
     * * cancel - Cancel the edit state.
     *
     * The following code example implements the custom command column.
     * ```html
     * <style type="text/css" class="cssStyles">
     * .details-icon:before
     * {
     *    content:"\e74d";
     * }
     * </style>
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * var gridObj = new Grid({
     * datasource: window.gridData,
     * columns : [
     *  { field: 'CustomerID', headerText: 'Customer ID' },
     *  { field: 'CustomerName', headerText: 'Customer Name' },
     *  {commands: [{buttonOption:{content: 'Details', click: onClick, cssClass: details-icon}}], headerText: 'Customer Details'}
     * ]
     * gridObj.appendTo("#Grid");
     * ```
     * @default null
     */
    public commands: CommandModel[];

    constructor(options: ColumnModel) {
        merge(this, options);
        this.uid = getUid('grid-column');
        let valueFormatter: ValueFormatter = new ValueFormatter();
        if (options.format && ((<DateFormatOptions>options.format).skeleton || (<DateFormatOptions>options.format).format)) {
            this.setFormatter(valueFormatter.getFormatFunction(options.format as DateFormatOptions));
            this.setParser(valueFormatter.getParserFunction(options.format as DateFormatOptions));
        }
        if (!this.field) {
            this.allowFiltering = false;
            this.allowGrouping = false;
            this.allowSorting = false;
        }
        if (this.commands && !this.textAlign) {
            this.textAlign = 'right';
        }
        if (this.template || this.commandsTemplate) {
            this.templateFn = templateCompiler(this.template || this.commandsTemplate);
        }
        if (this.filter.itemTemplate) {
            this.fltrTemplateFn = templateCompiler(this.filter.itemTemplate);
        }
    }

    private formatFn: Function;
    private parserFn: Function;
    private templateFn: Function;
    private fltrTemplateFn: Function;
    /** @hidden */
    public getFormatter(): Function {
        return this.formatFn;
    }
    /** @hidden */
    public setFormatter(value: Function): void {
        this.formatFn = value;
    }
    /** @hidden */
    public getParser(): Function {
        return this.parserFn;
    }
    /** @hidden */
    public setParser(value: Function): void {
        this.parserFn = value;
    }
    /** @hidden */
    public getColumnTemplate(): Function {
        return this.templateFn;
    }
    /** @hidden */
    public getFilterItemTemplate(): Function {
        return this.fltrTemplateFn;
    }
    /** @hidden */
    public getDomSetter(): string {
        return this.disableHtmlEncode ? 'textContent' : 'innerHTML';
    }
}

/**
 * Interface for a class Column
 */
export interface ColumnModel {

    /**    
     * Defines the field name of column which is mapped with mapping name of DataSource.  
     * The bounded columns can be sort, filter and group etc., 
     * If the `field` name contains “dot”, then it is considered as complex binding. 
     * The `field` name must be a valid JavaScript identifier, 
     * the first character must be an alphabet and should not contain spaces and special characters.
     * @default undefined    
     */
    field?: string;

    /**    
     * Gets the unique identifier value of column. It is used to get column object.   
     * @default undefined    
     */
    uid?: string;

    /**    
     * Defines the header text of column which is used to display in column header.    
     * If `headerText` is not defined, then field name value will be assigned to header text.   
     * @default undefined    
     */
    headerText?: string;

    /**    
     * Defines the width of column in pixels or percentage.    
     * @default undefined    
     */
    width?: string | number;

    /**    
     * Defines the minimum width of column in pixels or percentage.    
     * @default undefined    
     */
    minWidth?: string | number;
    /**    
     * Defines the maximum width of column in pixels or percentage.    
     * @default undefined    
     */
    maxWidth?: string | number;
    /**   
     * Define the alignment of column in both header and content cells.      
     * @default left 
     */
    textAlign?: string | TextAlign; //Should be enum

    /**   
     * Defines the cell content's overflow mode. The available modes are
     * * `clip` -  Truncates the cell content when it overflows its area. 
     * * `ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `ellipsiswithtooltip` - Displays ellipsis when the cell content overflows its area 
     * also it will display tooltip while hover on ellipsis applied cell.
     * @default ellipsis 
     */
    clipMode?: ClipMode;

    /**   
     * Define the alignment of column header which is used to align the text of column header.       
     * @default left  
     * @hidden  
     */
    headerTextAlign?: string | TextAlign; //Should be enum

    /**    
     * If `disableHtmlEncode` set to true, then it encodes the html of header and content cells.  
     * @default false    
     */
    disableHtmlEncode?: boolean;

    /**    
     * Defines the data type of column.    
     * @default null    
     */
    type?: string;

    /**    
     * It is used to change display value with the given format and does not affect the original data.   
     * Gets the format from the user which can be standard or custom 
     * [`number`](http://ej2.syncfusion.com/documentation/base/intl.html#number-formatter-and-parser) 
     * and [`date`](http://ej2.syncfusion.com/documentation/base/intl.html#date-formatter-and-parser) formats.  
     * @default null    
     */
    format?: string | NumberFormatOptions | DateFormatOptions;

    /**    
     * If `visible` set to false, then hide the particular column. By default all columns are displayed.   
     * @default true    
     */
    visible?: boolean;

    /**    
     * Defines the column template as string or HTML element ID which is used to add customized element in each cells of the column.     
     * @default null    
     */
    template?: string;

    /**        
     * Defines the column template as string or HTML element ID which is used to add customized element in the column header.      
     * @default null    
     * @hidden  
     */

    headerTemplate?: string;

    /**    
     * If `allowSorting` set to false, then it disables sorting option of a particular column.  
     * By default all columns are sortable. 
     * @default true    
     */
    allowSorting?: boolean;

    /**         
     * If `allowResizing` set to false, then it disables resize option of a particular column.  
     * @default true    
     */
    allowResizing?: boolean;

    /**    
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column. 
     * By default all columns are filterable.  
     * @default true    
     */
    allowFiltering?: boolean;

    /**    
     * If `allowGrouping` set to false, then it disables grouping of a particular column. 
     * By default all columns are groupable. 
     * @default true   
     */
    allowGrouping?: boolean;

    /**    
     * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values. 
     * By default no columns are group by format.   
     * @default true   
     */
    enableGroupByFormat?: boolean;

    /**    
     * If `allowEditing` set to false, then it disables editing of a particular column. 
     * By default all columns are editable.   
     * @default true   
     */
    allowEditing?: boolean;

    /**   
     * User can customize css styles and attributes of the content cells of a particular column.   
     * 
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript 
     * let gridObj: Grid = new Grid({
     * dataSource: filterData,
     * columns: [
     *    { field: 'OrderID', headerText: 'Order ID' },
     *    {
     *        field: 'EmployeeID', headerText: 'Employee ID', customAttributes: {
     *           class: 'employeeid',
     *           type: 'employee-id-cell'
     *      }
     *   }]
     * });
     * gridObj.appendTo('#Grid');
     * ```
     * 
     * @default null  
     */

    customAttributes?: { [x: string]: Object };

    /**    
     * If `displayAsCheckBox` set as true, then it displays column value as check box instead of boolean values.      
     * @default true    
     */
    displayAsCheckBox?: boolean;

    /**    
     * Defines the data source of the column which is used to bind the foreign key data source.    
     * @default null    
     * @hidden   
     */
    dataSource?: Object;

    /**    
     * Defines the method which is used to achieve custom formatting from an external function. 
     * This function triggers before rendering of each cell. 
     * 
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript 
     * class ExtendedFormatter implements ICellFormatter {
     * public getValue(column: Column, data: Object): Object {
     *   return '<span style="color:' + (data['Verified'] ? 'green' : 'red') + '"><i>' + data['Verified'] + '</i><span>';
     * }
     * }
     * let gridObj: Grid = new Grid({
     *     dataSource: filterData,
     *     columns: [
     *         { field: 'ShipName', headerText: 'Ship Name' },
     *         { field: 'Verified', headerText: 'Verified Status', formatter: ExtendedFormatter }]
     * });
     * gridObj.appendTo('#Grid');
     * ```
     * 
     * @default null  
     */
    formatter?: { new(): ICellFormatter } | ICellFormatter | Function;

    /**    
     * Defines the method which is used to apply custom cell values from external function and display this on each cells of render.     
     *     
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * let gridObj: Grid = new Grid({
     * dataSource: [{ EmployeeID: 1, EmployeeName: ['John', 'M'] }, { EmployeeID: 2, EmployeeName: ['Peter', 'A'] }],
     * columns: [
     *     { field: 'EmployeeID', headerText: 'Employee ID' },
     *     { field: 'EmployeeName', headerText: 'Employee First Name', 
     *       valueAccessor: (field: string, data: Object, column: Column) => {
     *             return data['EmployeeName'][0];
     *         },
     *     }]
     * }); 
     * ```
     *  
     * @default null    
     */
    valueAccessor?: ValueAccessor;

    /**    
     * The `filterBarTemplate` is used to add a custom component instead of default input component for filter bar.   
     * It have create and read functions.  
     * * create – It is used for creating custom components.  
     * * read – It is used to perform custom filter action. 
     * 
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript 
     * let gridObj: Grid = new Grid({
     * dataSource: filterData,
     * columns: [
     *   { field: 'OrderID', headerText: 'Order ID' },
     *   {
     *      field: 'EmployeeID', filterBarTemplate: {
     *         create: (args: { element: Element, column: Column }) => {                    
     *              let input: HTMLInputElement = document.createElement('input');
     *              input.id = 'EmployeeID';
     *              input.type = 'text';
     *              return input;
     *         },
     *         write: (args: { element: Element, column: Column }) => {                    
     *             args.element.addEventListener('input', args.column.filterBarTemplate.read as EventListener);
     *         },
     *         read: (args: { element: HTMLInputElement, columnIndex: number, column: Column }) => {
     *             gridObj.filterByColumn(args.element.id, 'equal', args.element.value);
     *        }
     *     }
     *  }],
     *   allowFiltering: true
     * });
     * gridObj.appendTo('#Grid');
     * ```
     * 
     * @default null   
     */
    filterBarTemplate?: IFilterUI;

    /**
     *  Defines the filter options to customize filtering for the particular column.
     *  @default null
     */

    filter?: IFilter;

    /**    
     * It is used to render multiple header rows(stacked headers) on the Grid header.      
     * @default null    
     */
    columns?: Column[] | string[] | ColumnModel[];

    /**    
     * Defines the tool tip text for stacked headers.    
     * @default null    
     * @hidden   
     */
    toolTip?: string;

    /**    
     * If `isPrimaryKey` set to true, then consider this column as primary key constraint.   
     * @default false         
     */
    isPrimaryKey?: boolean;

    /**    
     * Defines the type of component for editable.
     * @default stringedit         
     */
    editType?: string;

    /**    
     * Defines rules to validate data before create and update.
     * @default null         
     */
    validationRules?: Object;

    /**    
     * Defines the default values for component while adding a new record to the Grid.
     * @default null         
     */
    defaultValue?: string;

    /**    
     * Defines the `IEditCell` object to customize default edit cell.
     * @default {}         
     */
    edit?: IEditCell;

    /**    
     * If `isIdentity` is set to true, then this column is considered as identity column.
     * @default false         
     */
    isIdentity?: boolean;

    /**    
     * To define foreign key field name of the grid datasource.
     * @hidden
     * @default null         
     */
    foreignKeyField?: string;

    /**    
     * Defines the value to bind the field which is in foreign column datasource based on the foreignKeyField.
     * @hidden
     * @default null         
     */
    foreignKeyValue?: string;

    /**
     * column visibility can change based on its [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html). 
     * `hideAtMedia` accepts only valid Media Queries.
     * @default undefined
     */
    hideAtMedia?: string;

    /**    
     * If `showInColumnChooser` set to false, then hides the particular column in column chooser.
     * By default all columns are displayed in column Chooser.
     * @default true
     */
    showInColumnChooser?: boolean;

    /**
     * @hidden
     * Defines the commands column template as string or HTML element ID which is used to add
     * customized command buttons in each cells of the column.        
     */
    commandsTemplate?: string;

    /**
     * `commands` provides an option to display command buttons in every cell.
     * The available built-in command buttons are
     * * edit - Edit the record.
     * * delete - Delete the record.
     * * save - Save the record.
     * * cancel - Cancel the edit state.
     *
     * The following code example implements the custom command column.
     * ```html
     * <style type="text/css" class="cssStyles">
     * .details-icon:before
     * {
     *    content:"\e74d";
     * }
     * </style>
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * var gridObj = new Grid({
     * datasource: window.gridData,
     * columns : [
     *  { field: 'CustomerID', headerText: 'Customer ID' },
     *  { field: 'CustomerName', headerText: 'Customer Name' },
     *  {commands: [{buttonOption:{content: 'Details', click: onClick, cssClass: details-icon}}], headerText: 'Customer Details'}
     * ]
     * gridObj.appendTo("#Grid");
     * ```
     * @default null
     */
    commands?: CommandModel[];

}
