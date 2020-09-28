import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  result = [];
  todaysCheckIn;
  todaysCheckOut = 0;
  availableFWCapacity;
  availableTWCapacity;
  occupiedTWCapacity;
  occupiedFWCapacity;
  totalAmt;
  vendorSignupToday = 0;

  constructor(private firestore: AngularFirestore, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllVendors();
    this.getAllPL();
    this.getParkingTransactions();
    this.getRevenue();
  }

  getAllPL() {
    this.firestore.collection('parkingLots').get().toPromise().then((res) => {
      console.log(res['docs'])
      res['docs'].forEach((element, key) => {
        console.log(element)

        this.availableFWCapacity = element['Nf']['nn']['proto']['mapValue']['fields']['availableFWCapacity']['integerValue'];
        this.availableTWCapacity = element['Nf']['nn']['proto']['mapValue']['fields']['availableTWCapacity']['integerValue'];

        this.occupiedTWCapacity = element['Nf']['nn']['proto']['mapValue']['fields']['twoWheelerCapacity']['integerValue'];
        this.occupiedFWCapacity = element['Nf']['nn']['proto']['mapValue']['fields']['fourWheelerCapacity']['integerValue'];
        console.log(this.occupiedTWCapacity)
        console.log(this.occupiedFWCapacity)
      })
    })
  }

  getParkingTransactions() {
    let length = 0;
    this.firestore.collection('parkingTransactions').get().toPromise().then((res) => {
      console.log(res)
      res['docs'].forEach((element, key) => {
        if (element['Nf']['nn']['proto']['mapValue']['fields']['entryTimestamp']['timestampValue'].toString().slice(0,10) == new Date().toISOString().slice(0,10)) {
          length = length + 1;
        }
        if(element['Nf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'] != undefined) {
          if (element['Nf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'].toString().slice(0,10) == new Date().toISOString().slice(0,10)) {
            this.todaysCheckOut += 1;
          }
        }
      })
      this.todaysCheckIn = length;
      console.log(this.todaysCheckOut)
    })
  }

  getRevenue() { 
    this.firestore.collection('parkingTransactions').get().toPromise().then((res) => {
      console.log(res)
      res['docs'].forEach((element, key) => {
        if (element['Nf']['nn']['proto']['mapValue']['fields']['updatedAt']['timestampValue'].toString().slice(0,10) == new Date().toISOString().slice(0,10)) {
          console.log(element['Nf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue'])
          if(element['Nf']['nn']['proto']['mapValue']['fields']['exitTimestamp']['timestampValue']) {
            this.totalAmt += parseInt(element['Nf']['nn']['proto']['mapValue']['fields']['initPayment']['integerValue']) + parseInt(element['Nf']['nn']['proto']['mapValue']['fields']['addOnAmount']['integerValue']);
          } else {
            this.totalAmt += parseInt(element['Nf']['nn']['proto']['mapValue']['fields']['totalPayment']['integerValue'])
          }
        }
      })
    })
  }

  getAllVendors() {
    this.firestore.collection('vendors').get().subscribe(res => {
      res['docs'].forEach((element, key) => {
        if (new Date(parseInt(element['Nf']['nn']['proto']['mapValue']['fields']['id']['stringValue'].slice(3,13)) * 1000).toISOString().slice(0,10) == new Date().toISOString().slice(0, 10)) {
          this.vendorSignupToday += 1;
        }
        console.log(element)
        this.result.push(element)
      })
    })
    console.log(this.result)
  }

  completeKYC(vendor) {
    this.firestore.collection('vendors').doc(vendor['Nf']['nn']['proto']['mapValue']['fields']['id']['stringValue']).set({
      address: vendor['Nf']['nn']['proto']['mapValue']['fields']['address']['stringValue'],
      city: vendor['Nf']['nn']['proto']['mapValue']['fields']['city']['stringValue'],
      company: vendor['Nf']['nn']['proto']['mapValue']['fields']['company']['stringValue'],
      gstNo: vendor['Nf']['nn']['proto']['mapValue']['fields']['gstNo']['stringValue'],
      id: vendor['Nf']['nn']['proto']['mapValue']['fields']['id']['stringValue'],
      isActivated: vendor['Nf']['nn']['proto']['mapValue']['fields']['isActivated']['booleanValue'],
      isKYC: true,
      mobileNumber:vendor['Nf']['nn']['proto']['mapValue']['fields']['mobileNumber']['stringValue'],
      name:vendor['Nf']['nn']['proto']['mapValue']['fields']['name']['stringValue'],
      state: vendor['Nf']['nn']['proto']['mapValue']['fields']['state']['stringValue']
    }).then((res) => {
      console.log('KYC Updated successfully', res)
      this.toastrService.success('KYC Updated successfully')
      setTimeout(() => {
        location.reload()
      }, 3000);
    })
    .catch((error) => {
      console.log('Error in updating KYC', error)
      this.toastrService.error('Error in updating KYC')
    })
  }

  completeActivation(vendor) {
    console.log('I am inside Activation')

    this.firestore.collection('vendors').doc(vendor['Nf']['nn']['proto']['mapValue']['fields']['id']['stringValue']).set({
      address: vendor['Nf']['nn']['proto']['mapValue']['fields']['address']['stringValue'],
      city: vendor['Nf']['nn']['proto']['mapValue']['fields']['city']['stringValue'],
      company: vendor['Nf']['nn']['proto']['mapValue']['fields']['company']['stringValue'],
      gstNo: vendor['Nf']['nn']['proto']['mapValue']['fields']['gstNo']['stringValue'],
      id: vendor['Nf']['nn']['proto']['mapValue']['fields']['id']['stringValue'],
      isActivated: true,
      isKYC: vendor['Nf']['nn']['proto']['mapValue']['fields']['isKYC']['booleanValue'],
      mobileNumber:vendor['Nf']['nn']['proto']['mapValue']['fields']['mobileNumber']['stringValue'],
      name:vendor['Nf']['nn']['proto']['mapValue']['fields']['name']['stringValue'],
      state: vendor['Nf']['nn']['proto']['mapValue']['fields']['state']['stringValue']
    }).then((res) => {
      console.log('KYC Updated successfully' , res)
      this.toastrService.success('KYC Updated successfully')
      setTimeout(() => {
        location.reload()
      }, 3000);
    })
    .catch((error) => {
      console.log('Error in updating KYC', error)
      this.toastrService.error('Error in updating KYC')
    })
  }

}
