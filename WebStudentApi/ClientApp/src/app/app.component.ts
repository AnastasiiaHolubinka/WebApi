import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Student } from './student';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {

    student: Student = new Student();   // зміна
    students: Student[];                // массив студентів
    tableMode: boolean = true;          // табличний режим

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadStudents();    // загрузка данних при старті компоненти 
    }
    // отримання даних через сервіс
    loadStudents() {
        this.dataService.getStudents()
            .subscribe((data: Student[]) => this.students = data);
    }
    // збереження даних
    save() {
        if (this.student.id == null) {
            this.dataService.createStudent(this.student)
                .subscribe((data: Student) => this.students.push(data));
        } else {
            this.dataService.updateStudent(this.student)
                .subscribe(data => this.loadStudents());
        }
        this.cancel();
    }
    editProduct(p:Student) {
        this.student = p;
    }
    cancel() {
        this.student = new Student();
        this.tableMode = true;
    }
    delete(p: Student) {
        this.dataService.deleteStudent(p.id)
            .subscribe(data => this.loadStudents());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}