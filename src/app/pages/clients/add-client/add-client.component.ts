import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../client';
import { ClientsComponent } from '../clients.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})


export class AddClientComponent implements OnInit {

  listData:FormGroup;
  clientForm:FormGroup;
  client:Client;
  messageValidate= {
    nom: {
      required: 'Ce champs est requis'
    },
    email: {
      required: 'Ce champs est requis'
    },
    adresse: {
      required: 'Ce champs est requis'
    },
    prenom: {
      required: 'Ce champs est requis'
    }

  }

  constructor(public api: ClientService ,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)
    public data,
    public dialogRef:MatDialogRef<AddClientComponent>
     ) { }

  ngOnInit() {
    console.log('Addsomthing')
    if (this.api.choixmenu==='A')
     {
      this.client = {
        nom: '',
        prenom: '',
        adresse: '',
        email: '',
        codePostal: null,
        ville: '',
        telephone:''
      };
     }
     this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', [Validators.required, Validators]],
      prenom: ['', [Validators.required, Validators]],
      ville: '',
      telephone: '',
      codePostal:''
    });
  }

onSubmit(value) {
  console.log(value)
  console.log(this.clientForm.value.telephone)
  if (this.api.choixmenu === 'A')
  {
    this.addData();

  }
  else
  {
   this.updateData()
  }
}



addData() {
  if(this.clientForm.valid) {
    this.client.nom = this.clientForm.value.nom;
    this.client.prenom = this.clientForm.value.prenom;
    this.client.telephone= this.clientForm.value.telephone;
    this.client.adresse = this.clientForm.value.adresse;
    this.client.ville = this.clientForm.value.ville;
    this.client.email = this.clientForm.value.email;
    this.client.codePostal = this.clientForm.value.codepostal;

    console.log(this.client)
    console.log(this.clientForm)


    this.api.postData(this.client).subscribe( data => {
      this.dialogRef.close();

      this.api.getAll().subscribe(
        response =>{this.api.listData = response;}
       );
      this.router.navigate(['/clients']);
  });


}

else {
  console.log(this.clientForm)
}


  // this.api.postData(this.api.clientForm.value).
  // subscribe( data => {
  //   this.dialogRef.close();

  //   this.api.getAll().subscribe(
  //     response =>{this.api.listData = response;}
  //    );
  //   this.router.navigate(['/clients']);
  // });


}


// AddClient() {
//   if (this.clientForm.valid) {
//     this.client.nom = this.clientForm.value.nom;
//     this.client.prenom = this.clientForm.value.prenom;
//     this.client.telephone= this.clientForm.value.telephone;
//     this.client.adresse = this.clientForm.value.adresse;
//     this.client.ville = this.clientForm.value.ville;
//     this.client.email = this.clientForm.value.email;
//     this.client.codePostal = this.clientForm.value.codepostal;

//     this.api.postData(this.client);
//   }




updateData()
{
  this.api.putData(this.api.clientForm.value.Id,this.api.clientForm.value).
  subscribe( data => {
    this.dialogRef.close();

    this.api.getAll().subscribe(
      response =>{this.api.listData = response;}
     );
    this.router.navigate(['/clients']);
  });
}


}
