var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Student } from './student';
let AppComponent = class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.student = new Student(); // зміна
        this.tableMode = true; // табличний режим
    }
    ngOnInit() {
        this.loadStudents(); // загрузка данних при старті компоненти 
    }
    // отримання даних через сервіс
    loadStudents() {
        this.dataService.getStudents()
            .subscribe((data) => this.students = data);
    }
    // збереження даних
    save() {
        if (this.student.id == null) {
            this.dataService.createStudent(this.student)
                .subscribe((data) => this.students.push(data));
        }
        else {
            this.dataService.updateStudent(this.student)
                .subscribe(data => this.loadStudents());
        }
        this.cancel();
    }
    editProduct(p) {
        this.student = p;
    }
    cancel() {
        this.student = new Student();
        this.tableMode = true;
    }
    delete(p) {
        this.dataService.deleteStudent(p.id)
            .subscribe(data => this.loadStudents());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        providers: [DataService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map