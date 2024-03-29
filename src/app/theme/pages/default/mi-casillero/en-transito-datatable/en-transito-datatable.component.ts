import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EnviosService } from "../../../../../shared/services/api/envios.service";
import { Tracking } from "../../../../../shared/model/tracking.model";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-en-transito-datatable',
    templateUrl: './en-transito-datatable.component.html',
    styles: []
})
export class EnTransitoDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    @Output() ver: EventEmitter<any> = new EventEmitter();
    envio: any;
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, public enviosService: EnviosService,
        public toastr: ToastsManager) {
        super(ngbModal);
    }

    ngOnInit() {
        //console.log(this.data);
        this.page = this.filters.offset + 1;
        this.registroInicialPagina = this.totalItems > 0 ? this.filters.offset * this.filters.limit + 1 : 0;
        this.registroFinalPagina = this.registroInicialPagina + this.filters.limit > this.totalItems ? this.totalItems : this.registroInicialPagina + this.filters.limit - 1;
        //console.log(this.filters.offset, this.filters.limit, this.totalItems, this.registroInicialPagina, this.registroFinalPagina);
    }

    ngAfterViewInit() {
        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        //     'assets/demo/default/custom/components/datatables/base/html-table.js');
    }

    onVer(articulo, modal) {
        Helpers.setLoading(true);
        this.enviosService
          .getArticulos({ id: articulo })
          .subscribe(
            (dato) => {
              Helpers.setLoading(false);
             this.envio= dato.json().data;
             this.envio['fecha_bodega'] = moment(this.envio['fecha_bodega']).tz("America/New_York").format("DD/MM/Y");
             this.ngbModal.open(modal, { size: "lg" });
            },
            error => {
              Helpers.setLoading(false);
              this.toastr.error('Ocurrió un error cargando los detalles');
            }
          );
    }

    onVerImagenes(articulo) {
        this.ver.emit(articulo);
    }


}

