export class Utils {

    static getSettings(isSuccessSetting: boolean = true) {
        let settings = {};
        if (isSuccessSetting) {
            settings = {
                attr: {
                    class: 'table table-bordered table-sm'
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
                    endPoint: {
                        title: '요청 api',
                        valuePrepareFunction: (data) => {
                            return data.replace(/\//g, "");
                        },
                    },
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
            }
        } else {
            settings = {
                attr: {
                    class: 'table table-bordered table-sm'
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
                        title: '상품명',
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

                    endPoint: {
                        title: '요청 api',
                        valuePrepareFunction: (data) => {
                            return data.replace(/\//g, "");
                        }
                    },
                    parameterJson: {
                        title: '요청 파라미터'
                        // valuePrepareFunction: (data) => {
                        //     console.log(data)
                        //     return  JSON.parse(data);
                        // },
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
            }
        }

        return settings
    }
}