import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from 'rxjs/operators';

interface ReqData {
    apiName: string,
    params: any
}

interface ResData {
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'smart-store';
    selected = 1;
    isCheckReceiverAddressChanged = true;

    reqData: ReqData = {
        'apiName': "",
        'params': {}
    };

    resData: ResData = {};

    /**
     * endpoint
     */
    readonly URL = 'http://localhost:8080/';

    constructor(private http: HttpClient,
        private spinner: NgxSpinnerService) {
    }

    ngOnInit(): void {
        this.reqData = {
            'apiName': "",
            'params': {}
        };

        this.resData = {};
    }


    excute(methodName: string, obj: any): void {
        for (const key in obj) {
            this.reqData.params[key] = obj[key]
        }

        this.spinner.show();
        this.http
            .get(`${this.URL}/${methodName}`, {
                params: this.reqData.params
            })
            .pipe(
                finalize(() => {
                    this.spinner.hide();
                })
            )
            .subscribe((res) => {
                this.reqData['apiName'] = methodName
                this.resData = res['data'];
            });
    }

    changeGender(e) {
        this.isCheckReceiverAddressChanged = !this.isCheckReceiverAddressChanged
    }
}
