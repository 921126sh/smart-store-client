import { HttpClient } from '@angular/common/http';
import { Component, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Utils } from './utils';

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
    /**
     * 선택된 메뉴
     */
    selected = 17;

    /**
     * 상품주문식별자
     */
    productOrderId = '';

    /**
     *
     */
    isCheckReceiverAddressChanged = true;

    /**
     * 요청데이터
     */
    reqData: ReqData = {'apiName': '', 'params': {}};

    /**
     * 응답데이터
     */
    resData: ResData = {};

    /**
     * 성공실패 테이블 설정 값
     */
    successTableSettings = Utils.getSettings(true)
    errorTableSettings = Utils.getSettings(false);

    /**
     * menu 변경 감지 객체
     */
    selectedMenuDiffer: KeyValueDiffer<string, any>;

    /**
     * endpoint
     */
    readonly URL = 'http://localhost:8080';
    // readonly URL = 'http://10.52.5.73:8080/';

    /**
     * 생성자다.
     * @param http http 객체
     * @param spinner spinner 객체
     * @param differs differs 객체
     */
    constructor(private http: HttpClient,
        private spinner: NgxSpinnerService,
        private differs: KeyValueDiffers) {

        this.selectedMenuDiffer = this.differs.find({ 'selected': this.selected }).create();
        this.excute('StoreLogsErrorLists', {});

    }

    /**
     * 등록된 model을 watching한다.
     */
    ngDoCheck(): void {
        const changes = this.selectedMenuDiffer.diff({ 'selected': this.selected });
        if (changes) {
            this.init();
        }
    }

    /**
     * data set을 초기화한다.
     */
    init(): void {
        this.reqData = {
            'apiName': '',
            'params': {}
        };

        this.resData = {};

        this.productOrderId = '';
    }

    /**
     * 요청된 http실행을 요청한다.
     * @param methodName 실행메소드 명
     * @param obj 동적파라미터 객체
     */
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
                this.reqData['apiName'] = methodName;
                this.resData = res['data'];
            });
    }

    /**
     * 상태를 변화시킨다.
     */
    changeGender() {
        this.isCheckReceiverAddressChanged = !this.isCheckReceiverAddressChanged
    }
}
