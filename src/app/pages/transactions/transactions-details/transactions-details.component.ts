import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactions-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transactions-details.component.scss']
})
export class TransactionsDetailsComponent implements OnInit {
  id;
  result = [];
  editButtonClicked = false;
  discount;
  remarks;
  date;
  time;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private toastrService:ToastrService) {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      console.log(this.id)
    })
   }

   ngOnInit(): void {
    this.getTransactionById(this.id);
  }

  getTransactionById(id) {
    let result = this.firestore.collection('parkingTransactions', ref => ref
    .where('id', '==' , id)
    )

    result.get().subscribe(res => {
      console.log(res)
      res['docs'].forEach((element, key) => {
        this.result.push(element['Nf']['nn']['proto']['mapValue']['fields'])
        this.remarks = element['Nf']['nn']['proto']['mapValue']['fields']['remarks']['stringValue']
      })
    })
    console.log(this.result)
  }

  onEdit() {
    const elements = document.getElementsByTagName('input');
    console.dir( elements )
    console.dir(document.getElementById('input-exit-time'))
    console.dir(document.getElementById('input-exit-date'))
    console.dir(document.getElementById('input-discount'))

    document.getElementById('input-exit-time')['readOnly'] = false;
    document.getElementById('input-exit-date')['readOnly'] = false;
    document.getElementById('input-discount')['readOnly'] = false;
    
    const textarea = document.getElementsByTagName('textarea');

    for(let j = 0; j < textarea.length; j++) {
      textarea[j].readOnly = false;
    }
  }

  onSubmit(transaction) {
    
    let exitDate = document.getElementById('input-exit-date')['value'] + 'T' + document.getElementById('input-exit-time')['value'] + 'Z';
    let discount = parseInt(document.getElementById('input-discount')['value']);
    let entryDate = transaction['entryTimestamp']['timestampValue'];
    let newEntryDate = new Date(entryDate);
    let newExitDate = new Date(exitDate);
    let updatedAt = transaction['updatedAt']['timestampValue'];
    let newUpdatedAt = new Date(updatedAt);

    console.log(typeof newExitDate)
    console.log(typeof newEntryDate)
    console.log(typeof newUpdatedAt)

    console.log(newExitDate)

    this.firestore.collection('parkingTransactions').doc(transaction['id']['stringValue']).set({
      addOnAmount: parseInt(transaction['addOnAmount']['integerValue']),
      discountPercent: discount,
      remarks: this.remarks,
      entryTimestamp: newEntryDate,
      exitTimestamp: newExitDate,
      id: transaction['id']['stringValue'].toString(),
      initPayment: parseInt(transaction['initPayment']['integerValue']),
      isFree: transaction['isFree']['booleanValue'],
      parkingLotId: transaction['parkingLotId']['stringValue'].toString(),
      parkingType: transaction['parkingType']['stringValue'].toString(),
      prevBalanceAmount: parseInt(transaction['prevBalanceAmount']['integerValue']),
      safetyCharges: parseInt(transaction['safetyCharges']['integerValue']),
      secureOtp: transaction['secureOtp']['stringValue'].toString(),
      totalPayment: parseInt(transaction['totalPayment']['integerValue']),
      updatedAt: newUpdatedAt,
      vehicleMobileNo: transaction['vehicleMobileNo']['stringValue'].toString(),
      vehicleNo: transaction['vehicleNo']['stringValue'].toString(),
      vehicleType: transaction['vehicleType']['stringValue'].toString()
    }).then((res) => {
      console.log('Transaction updated successfully', res)
      this.toastrService.success('Transaction Updated successfully...')
      setTimeout(() => {
        location.reload()
      }, 1000);
    })
    .catch((error) => {
      console.log('Error in upating transaction', error)
      this.toastrService.error('Error in updating Transaction')
    })
  }

}
