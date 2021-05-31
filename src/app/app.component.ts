import { HttpClient } from '@angular/common/http';
import { Component, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    productOrderId = '';

    selected = 17;

    isCheckReceiverAddressChanged = true;

    reqData: ReqData = {
        'apiName': '',
        'params': {}
    };

    resData: ResData = {};

    selectedDiffer: KeyValueDiffer<string, any>;

    settings = {
        attr: {
            class: 'table table-bordered table-sm ng2-table'
        },
        noDataMessage: "조회가능한 데이터가 존재하지 않습니다.",
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
            beforeClaimType: {
                title: '변경전 클레임 유형'
            },
            beforeClaimStatus: {
                title: '변경전 클레임 상태'
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
            afterClaimType: {
                title: '변경후 클레임 유형'
            },
            afterClaimStatus: {
                title: '변경후 클레임 상태'
            },
        }
    };

    settings2 = {
        attr: {
            class: 'table table-bordered table-sm ng2-table'
        },
        noDataMessage: "조회가능한 데이터가 존재하지 않습니다.",
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
            beforeClaimType: {
                title: '변경전 클레임 유형'
            },
            beforeClaimStatus: {
                title: '변경전 클레임 상태'
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

            afterClaimType: {
                title: '변경후 클레임 유형'
            },
            afterClaimStatus: {
                title: '변경후 클레임 상태'
            },
            errorCode: {
                title: '에러코드'
            },
            errorMessage: {
                title: '에러메시지'
            }
        }
    };

    /**
     * endpoint
     */
    readonly URL = 'http://localhost:8080/';

    constructor(private http: HttpClient,
        private spinner: NgxSpinnerService,
        private differs: KeyValueDiffers) {

        this.selectedDiffer = this.differs.find({ 'selected': this.selected }).create();
        this.excute('StoreLogsErrorLists', {});

    }

    ngOnChanges() {
        console.log('CHANGES')
    }
    ngDoCheck(): void {
        const changes = this.selectedDiffer.diff({ 'selected': this.selected });

        if (changes) {
            this.init();
        }

    }

    init(): void {
        this.reqData = {
            'apiName': '',
            'params': {}
        };

        this.resData = {};

        this.productOrderId = '';
    }


    excute(methodName: string, obj: any): void {
        console.log(obj)
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
                this.reqData['apiName'] = methodName;
                this.resData = res['data'];
            });
    }

    changeGender(e) {
        this.isCheckReceiverAddressChanged = !this.isCheckReceiverAddressChanged
    }
}
