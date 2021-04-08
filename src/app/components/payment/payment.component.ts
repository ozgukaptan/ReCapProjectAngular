import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car, CarDetail } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { CreditCard } from 'src/app/models/creditCard';
import { FindeksService } from 'src/app/services/findeks.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private carDetailService: CarDetailService,
    private router: Router, private toastr: ToastrService, private paymentService: PaymentService, private formBuilder: FormBuilder
    , private cookieService: CookieService, private toastrService: ToastrService, private userService: UserService, private findeksService: FindeksService) { }

  userId: number = + this.cookieService.get('userId');


  selectedCreditCard: CreditCard;
  creditCards: CreditCard[];
  rental: Rental;
  carDetail: CarDetail;
  amountOfPayment: number = 0;
  payment: Payment = { amount: 0 };
  dataLoaded = false;
  isChecked = false;
  findeksChecked = false;
  creditCardForm: FormGroup;

  ngOnInit(): void {
    this.createUserUpdateForm()
    console.log(this.creditCards)

    this.activatedRoute.params.subscribe(params => {
      if (params["rental"]) {
        this.rental = JSON.parse(params['rental']);
        console.log(this.rental)
        this.getCar();
      }
    }, responseError => {
      console.log("message")
      this.toastr.error(responseError.error.message.toString(), "işlem başarısız");
    })
    this.getCreditCardsByUserId()
  }

  createUserUpdateForm() {
    this.creditCardForm = this.formBuilder.group({
      userId: [this.userId, Validators.required],
      cardName: ["", Validators.required],
      cardNumber: ["", Validators.required],
      expration: ["", Validators.required],
      cvv: ["", Validators.required],
      isChecked: [false, Validators.required]
    })
  }

  saveCard() {

    if (this.creditCardForm && this.isChecked) {

      let creditCardModal = Object.assign(this.creditCardForm.value)
      console.log(creditCardModal)
      this.paymentService.saveCreditCard(creditCardModal).subscribe(response => {
        this.toastrService.success(response.message);
      }, errorResponse => {
        console.log(errorResponse)
        this.toastrService.error(errorResponse.error, "Error")
      }
      )
    }
  }

  getCar() {
    this.carDetailService.getCar(this.rental.carId).subscribe(response => {
      this.carDetail = response.data;
      console.log(this.carDetail)
      this.paymentCalculator();
    }, responseError => {
      console.log("message")
      this.toastr.error(responseError.error.message.toString(), "işlem başarısız");
    })
  }
  paymentCalculator() {

    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();


      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      console.log(numberOfDays * this.carDetail.dealyPrice)
      this.amountOfPayment = numberOfDays * this.carDetail.dealyPrice;
      this.payment.amount = this.amountOfPayment;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastr.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
      }
    }
  }

  pay() {
    this.findeksControl()
    if (this.findeksChecked) {
      this.paymentService.pay(this.payment, this.rental).subscribe(response => {
        this.toastr.success(response.message.toString(), "İşlem Başarılı");
        this.saveCard();
        this.router.navigate(['/cars']);
      }, responseError => {
        this.toastr.error(responseError.error.message.toString(), "işlem başarısız");
      })
    }else
    {
      this.toastr.warning("Findeks Puanınız Yetersiz");
    }
  }


  getCreditCardsByUserId() {
    this.paymentService.getCreditCardsByUserId(this.userId).subscribe(response => {
      this.creditCards = response.data;
    })
  }

  fillCardInformation(selectedCreditCard: CreditCard) {
    this.selectedCreditCard = selectedCreditCard;
    if (this.selectedCreditCard)
      this.creditCardForm.patchValue({ ...this.selectedCreditCard });
    else this.creditCardForm.reset();
  }

  findeksControl() {
    this.findeksService.getUserFindeksPoint(this.userId).subscribe(response => {
      if (this.carDetail.findeksPoint < response.data.findeksPoint) {
        this.findeksChecked = true;
      }
      return false
    }, errorResponse => {
      return false
    })

  }

}
