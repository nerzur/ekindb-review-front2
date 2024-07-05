import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {UserService} from "../../service/user.service";
import {MessageService} from "primeng/api";
import {UserDTO} from "../../api/UserDTO";
import {of} from "rxjs";

@Component({
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    // public userProfile: KeycloakProfile | null = null;
    public username: string;
    public email: string;
    public fullName: string;
    public emailVerified: boolean = true;
    public roles: string[] = [];
    public severity = ["success", "info", "warning", "danger", "secondary", "contrast"];
    public randomSeverity:string = "";
    // public rolesSelected: string[] = [];
    // public rolesList:string[] = ["Administrator", "User"];

    public passwordField = ["", ""];

    public userForm : UserDTO = {
        email: "",
        enabled: true,
        firstName: "",
        lastName: "",
        password: "",
        roles: [],
        username: "",
    };

    constructor(private keycloak: KeycloakService,
                private userService: UserService,
                private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.loadUserProfile();
        this.randomSeverity = this.severity[Math.floor(Math.random() * this.severity.length)]
    }

    loadUserProfile() {
        this.userService.getAuthUserInformation().subscribe((data:  UserDTO)=> {
            this.username = this.userForm.username = data.username;
            this.email = this.userForm.email = data.email
            this.fullName = data.firstName + " " + data.lastName;
            this.userForm.firstName = data.firstName;
            this.userForm.lastName = data.lastName;
            this.emailVerified = this.userForm.enabled = data.enabled;
            this.roles = [];

            data.roles.forEach((rol: string) => {
                if (rol.startsWith("ROLE"))
                    switch (rol) {
                        case "ROLE_ADMIN" :
                            this.roles.push("Administrator");
                            break;
                        case "ROLE_USER" :
                            this.roles.push("User");
                            break;
                    }
            });
        },error => {console.log(error)});
    }

    updateProfile(){
        this.userForm.password = this.passwordField[0];
        this.userService.changeUserInformation(this.userForm).subscribe(
            ()=>{},
            error => {
                console.log(error)
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'One error was been occurred when save the user information.' });
            },
            () => {
                this.passwordField = [];
                this.loadUserProfile();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User data is saved successfully.' });
        })
    }

    validatePasswords(){
        return this.passwordField[0] == this.passwordField[1];
    }

    writeColorsForInvalidPassword(){
        return !this.validatePasswords()? "ng-dirty ng-invalid" : "";
    }
}
