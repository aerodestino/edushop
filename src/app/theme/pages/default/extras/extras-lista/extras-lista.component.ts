import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewContainerRef
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { ExtrasService } from "../../../../../shared/services/api/extras.service";
import { CanService } from "../../../../../shared/services/auth/can.service";

@Component({
  selector: "app-extras-lista",
  templateUrl: "./extras-lista.component.html",
  styles: []
})
export class ExtrasListaComponent extends BaseListComponent implements OnInit {
  modalRef = null;
  id: any;
  @Output() verCupos: EventEmitter<any> = new EventEmitter();
  constructor(
    public extrasService: ExtrasService,
    public ngbModal: NgbModal,
    public router: Router,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public appService: AppService,
    public can: CanService
  ) {
    super(router, toastr, vcr, appService);
    this.url = "/extras";
    this.resourceService = extrasService;
    this.filters.user_id = this.appService.user.id;
    this.filters.web = true;
  }

  ngOnInit() {
    super.getData();
  }

  openCreate(modal) {
    this.modalRef = this.ngbModal.open(modal, { size: "lg" });
  }

  openUpdate(id, modal) {
    this.id = id;
    this.modalRef = this.ngbModal.open(modal, { size: "lg" });
  }

  cerrarModal() {
    this.modalRef.close();
    super.getData();
  }

  onVerCupos(extra) {
    this.verCupos.emit(extra);
  }
}
