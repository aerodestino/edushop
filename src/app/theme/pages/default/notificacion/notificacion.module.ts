import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DefaultComponent } from "../default.component";
import { NotificacionComponent } from "./notificacion.component";
import { LayoutModule } from "../../../layouts/layout.module";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": NotificacionComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, NgbModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        NotificacionComponent
    ]
})
export class NotificacionModule {


}