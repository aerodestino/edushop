import { Component, Input, OnInit,EventEmitter,Output, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";
import { PaisesService } from "../../../../../shared/services/api/paises.service";
import { ProvinciasService } from "../../../../../shared/services/api/provincias.service";
import { CiudadesService } from "../../../../../shared/services/api/ciudades.service";
import { AppService } from "../../../../../app.service";
import { Helpers } from "../../../../../helpers";
import { Province } from "../../../../../shared/model/province.model";
import { debugOutputAstAsTypeScript } from "@angular/compiler";

@Component({
    selector: "app-password",
    templateUrl: './password.component.html',
    styles: []
})
export class PasswordComponent implements OnInit {
    paises: any[];
    provincias: any[] = [];
    ciudades: any[] = [];
    message: any='';
    @Output() cambiarPass: EventEmitter<any> = new EventEmitter();
    constructor(public usuariosService: UsuariosService,
        public toastr: ToastsManager,
        public appService: AppService,
        public vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    onSubmit(datosUsuario) {
        Helpers.setLoading(true);
        this.usuariosService.cambiarPassword(datosUsuario).subscribe(() => {
            this.appService.loadingMessage = "Cargando";
            Helpers.setLoading(false);
            this.message="Contraseña cambiada con éxito";
            this.cambiarPass.emit(this.message);
        }, error => {
            this.appService.loadingMessage = "Cargando";
            Helpers.setLoading(false);
            this.message=error.json().error.message;
            this.cambiarPass.emit(this.message);
        });
    }

    onCancel() {

    }

    onCambiarPass() {
        this.cambiarPass.emit(this.message);
    }
}
