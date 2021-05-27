import { HttpClient } from '@angular/common/http';
import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
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

    // afterClaimStatus: null
    // afterClaimType: null
    // afterProductOrderStatus: null
    // beforeClaimStatus: null
    // beforeClaimType: null
    // beforeProductOrderStatus: null
    // errorCode: "ERR-NC-UNKNOWN"
    // errorDetail: "Transaction ID: 52CBDCD22D9A4B6CA020296096810A60105A"
    // errorMessage: "상품주문 정보 조회실패(일시적인 장애)"
    // mallId: null
    // parameterJson: "{\"ProductOrderID\": \"\"}"
    // productId: null
    // productName: null
    // productOption: null
    // productOrderId: null

    settings = {
        pager: {
            display: false
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            productOrderId: {
                title: '상품ID'
            },
            productName: {
                title: '상품명'
            },
            beforeProductOrderStatus: {
                title: '변경전 주문상태'
            },
            beforeClaimStatus: {
                title: '변경전 클레임 상태'
            },
            beforeClaimType: {
                title: '변경전 클레임 유형'
            },
            // apiName: {
            //     title: '요청 api'
            // },
            parameterJson: {
                title: '요청 파라미터'
            },
            afterProductOrderStatus: {
                title: '변경후 주문상태'
            },
            afterClaimStatus: {
                title: '변경후 클레임 상태'
            },
            afterClaimType: {
                title: '변경후 클레임 유형'
            },
        }
    };

    settings2 = {
        pager: {
            display: false
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            productOrderId: {
                title: '상품ID'
            },
            productName: {
                title: '상품명'
            },
            beforeProductOrderStatus: {
                title: '변경전 주문상태'
            },
            beforeClaimStatus: {
                title: '변경전 클레임 상태'
            },
            beforeClaimType: {
                title: '변경전 클레임 유형'
            },
            // apiName: {
            //     title: '요청 api'
            // },
            parameterJson: {
                title: '요청 파라미터'
            },
            afterProductOrderStatus: {
                title: '변경후 주문상태'
            },
            afterClaimStatus: {
                title: '변경후 클레임 상태'
            },
            afterClaimType: {
                title: '변경후 클레임 유형'
            },
            errorCode: {
                title: '에러코드'
            },
            errorMessage: {
                title: '에러메시지'
            }
        }
    };

    reqData: ReqData = {
        'apiName': "",
        'params': {}
    };

    resData: ResData = {};

    selectedDiffer: KeyValueDiffer<string, any>;

    /**
     * endpoint
     */
    readonly URL = 'http://localhost:8080/';

    constructor(private http: HttpClient,
        private spinner: NgxSpinnerService,
        private differs: KeyValueDiffers) {

        this.selectedDiffer = this.differs.find({ "tt": this.selected }).create();
    }

    ngOnInit(): void {

    }
    ngOnChanges() {
        console.log("CHANGES")
    }
    ngDoCheck(): void {
        const changes = this.selectedDiffer.diff({ "tt": this.selected });

        if (changes) {
            this.init();
        }
    }

    init(): void {
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
