import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule }
from "@angular/forms";
import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  
  // Local variables.
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message : string = '';

  // Constructor for the form, router, and service
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
    ) {}

    ngOnInit(): void {
      let tripCode = localStorage.getItem("tripCode");
      if(!tripCode) {
        alert("Cannot find tripCode!")
        this.router.navigate(['']);
        return;
      }

      // For debugging:
      //console.log('EditTripComponent::ngOnInit');
      //console.log('tripcode:' + tripCode);
      
      // Edit form builder
      this.editForm = this.formBuilder.group({
        _id: [],
        code: [tripCode, Validators.required],
        name: ['', Validators.required],
        length: ['', Validators.required],
        start: ['', Validators.required],
        resort: ['', Validators.required],
        perPerson: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required]
        })
        
        // Call the tripDataService method to retrieve the data.
        this.tripDataService.getTrip(tripCode)
        .subscribe({
          next: (value: any) => {
            
            this.trip = value[0];
            
            // Populate the record into the form
            this.editForm.patchValue(this.trip);

            // Edit the date format with Angular's 'formatDate()' so the date picker updates.
            this.editForm.controls['start'].setValue(formatDate(this.trip.start,'yyyy-MM-dd','en'));
            
            
            if(!value) {
              this.message = 'No Trip Retrieved!';
            }
            else {
              this.message = 'Trip: ' + tripCode + ' retrieved';
            }
            console.log(this.message);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }

    // Call the put method in trpDataSerice to submit the updates.
    public onSubmit() {

      this.submitted = true;

      if (this.editForm.valid) {
        this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next : value => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error:any) => {
            console.log('Error: ' + error);
          }
        })
      }
    }
    // get the form short name to access the form fields
    get f() { return this.editForm.controls; }
}
