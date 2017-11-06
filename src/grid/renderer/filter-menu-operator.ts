import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { createElement } from '@syncfusion/ej2-base';
import { Column } from '../models/column';
import { FilterSettings } from '../base/grid';
import { PredicateModel } from '../base/grid-model';
import { IGrid } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { Query, DataManager } from '@syncfusion/ej2-data';

/**
 * `filter operators` render boolean column.
 * @hidden
 */

export class FlMenuOptrUI {
    private parent: IGrid;
    private customFilterOperators: Object;
    private serviceLocator: ServiceLocator;
    private filterSettings: FilterSettings;
    private dropOptr: DropDownList;
    private customOptr: { [key: string]: Object }[];
    private optrData: Object;

    constructor(parent?: IGrid, customFltrOperators?: Object, serviceLocator?: ServiceLocator, filterSettings?: FilterSettings) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
        this.customFilterOperators = customFltrOperators;

    }

    /**
     * @hidden
     */
    public renderOperatorUI(dlgConetntEle: Element, target: Element, column: Column): void {
        let optr: string = column.type + 'Operator';
        this.optrData = this.customOptr = (!isNullOrUndefined(this.parent.filterSettings.operators) &&
            !isNullOrUndefined(this.parent.filterSettings.operators[optr])) ?
            this.parent.filterSettings.operators[optr] : this.customFilterOperators[optr];
        let dropDatasource: { [key: string]: Object }[] = this.customOptr;
        let selectedValue: string = this.dropSelectedVal(column, optr);
        let optrDiv: HTMLElement = createElement('div', { className: 'e-flm_optrdiv' });
        dlgConetntEle.appendChild(optrDiv);
        let optrInput: Element = createElement('input', { id: column.uid + '-floptr' });
        optrDiv.appendChild(optrInput);
        this.dropOptr = new DropDownList({
            dataSource: dropDatasource,
            fields: { text: 'text', value: 'value' },
            text: selectedValue
        });
        this.dropOptr.appendTo('#' + column.uid + '-floptr');
    }

    private dropSelectedVal(col: Column, optr: string): string {
        let selValue: string = '';
        let columns: PredicateModel[] = this.parent.filterSettings.columns;
        for (let column of columns) {
            if (col.field === column.field) {
                let selectedField: Object = new DataManager(this.optrData).executeLocal(
                    new Query().where('value', 'equal', column.operator));
                selValue = !isNullOrUndefined(selectedField[0]) ? selectedField[0].text : '';
            }
        }
        if (selValue === '') {// rewuired or not
            selValue = this.optrData[0].text;
        }

        return selValue;
    }

    /**
     * @hidden
     */
    public getFlOperator(): string {
        return (this.dropOptr.value as string);
    }
}