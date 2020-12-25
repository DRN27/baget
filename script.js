const app = new Vue({
    el: '#app',
    data: {
        uploadedImgSrc: '',
        isDrawBaget: false,
        blockInputs: false,
        cropImgMode: false,
        userWidth: '',
        userHeight: '',
        bagetMaterial: 'Ольха',
        bagetСoating: 'Без покрытия',
        croppedImg: {},
        bagetWidth: 0,
        bagetHeight: 0,
        borderWidth: 0,
        imgHeight: 0,
        imgWidth: 0,
        sideContainerWidth: 0,
        scale: 0,
        price: 0,
        selectedBagetItem: null,
        bagetsList: [
            {
                id: 1,
                preview: 'images/rams/1.jpg',
                horImg: 'url("images/1_2.jpg")',
                vertImg: 'url("images/1_1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: true
            },
            {
                id: 2,
                preview: 'images/rams/2.jpg',
                horImg: 'url("images/2_2.jpg")',
                vertImg: 'url("images/2_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 3,
                preview: 'images/rams/3.jpg',
                horImg: 'url("images/3_2.jpg")',
                vertImg: 'url("images/3_1.jpg")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            },
            {
                id: 4,
                preview: 'images/rams/4.jpg',
                horImg: 'url("images/4_2.jpg")',
                vertImg: 'url("images/4_1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: false
            },
            {
                id: 5,
                preview: 'images/rams/5.jpg',
                horImg: 'url("images/5_1.jpg")',
                vertImg: 'url("images/5_2.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 6,
                preview: 'images/rams/6.jpg',
                horImg: 'url("images/6_1.jpg")',
                vertImg: 'url("images/6_2.jpg")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            },{
                id: 7,
                preview: 'images/rams/7.jpg',
                horImg: 'url("images/7_1.jpg")',
                vertImg: 'url("images/7_2.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: false
            },
            {
                id: 8,
                preview: 'images/rams/8.jpg',
                horImg: 'url("images/8_2.jpg")',
                vertImg: 'url("images/8_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 9,
                preview: 'images/rams/9.jpg',
                horImg: 'url("images/9_2.jpg")',
                vertImg: 'url("images/9_1.jpg")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            },
            {
                id: 10,
                preview: 'images/rams/10.jpg',
                horImg: 'url("images/10_2.jpg")',
                vertImg: 'url("images/10_1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: false
            },
            {
                id: 11,
                preview: 'images/rams/11.jpg',
                horImg: 'url("images/11_2.jpg")',
                vertImg: 'url("images/11_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
                {
                id: 12,
                preview: 'images/rams/12.jpg',
                horImg: 'url("images/12_2.jpg")',
                vertImg: 'url("images/12_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
                {
                id: 13,
                preview: 'images/rams/13.jpg',
                horImg: 'url("images/13_2.jpg")',
                vertImg: 'url("images/13_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
                {
                id: 14,
                preview: 'images/rams/14.jpg',
                horImg: 'url("images/14_2.jpg")',
                vertImg: 'url("images/14_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
                {
                id: 15,
                preview: 'images/rams/15.jpg',
                horImg: 'url("images/15_2.jpg")',
                vertImg: 'url("images/15_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
                {
                id: 16,
                preview: 'images/rams/16.jpg',
                horImg: 'url("images/16_2.jpg")',
                vertImg: 'url("images/16_1.jpg")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            
            {
                id: 17,
                preview: 'images/rams/17.jpg',
                horImg: 'url("images/17_2.jpg")',
                vertImg: 'url("images/17_1.jpg")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            }
        ]
    },
    methods: {
        uploadImg() {
            this.$refs.upload.click();
        },

        async showImg(event) {
            if (event.target.files) {
                this.uploadedImgSrc =  await URL.createObjectURL(event.target.files[0]);
                setTimeout(() => {
                    const img = this.$refs.uploadedImg;
                    const croppedImg = this.$refs.croppedImg;

                    cropper = new Cropper(img, {
                        viewMode: 1,
                        crop(event) {
                            canvas = this.cropper.getCroppedCanvas();
                            croppedImg.src = canvas.toDataURL("image/png");
                        },
                    });
                this.blockInputs = true;
                }, 1);
            }
        },
        crop() {
            const croppedImg = this.$refs.croppedImg;
            this.croppedImg.width = croppedImg.width;
            this.croppedImg.height = croppedImg.height;
            this.croppedImg.src = croppedImg.src;
            this.blockInputs = false;
            this.cropImgMode = true;
            setTimeout(() => {
                const img = this.$refs.cropBagetImg;
                img.width = this.croppedImg.width;
                img.height = this.croppedImg.height;
                img.src = this.croppedImg.src;
            },100);
        },
        setWidth() {
            if (!this.blockInputs && +this.userWidth >= 0) {
                if (+this.userWidth <= 600) {
                    if (+this.userWidth >= 10) {
                        if (this.cropImgMode) {
                            this.userHeight = Math.round(this.croppedImg.height * this.userWidth / this.croppedImg.width);
                            if (this.userHeight > 400) {
                                this.userHeight = 400;
                                this.userWidth = Math.round(this.croppedImg.width * this.userHeight / this.croppedImg.height);
                            }
                            this.countBagetParameters();
                        } else if (this.userHeight > 9) {
                            this.isDrawBaget = true;
                            this.countBagetParameters();
                        }
                    }
                    this.countPrice();
                } else {
                    this.userWidth = 600;
                    this.countPrice();
                }
            } else {
                this.userWidth = '';
            }
        },
        setHeight() {
            if (!this.blockInputs && +this.userHeight >= 0) {
                if (+this.userHeight <= 400) {
                    if (+this.userHeight >= 10) {
                        if (this.cropImgMode) {
                            this.userWidth = Math.round(this.croppedImg.width * this.userHeight / this.croppedImg.height);
                            if (this.userWidth > 600) {
                                this.userWidth = 600;
                                this.userHeight = Math.round(this.croppedImg.height * this.userWidth / this.croppedImg.width);
                            }
                            this.countBagetParameters();
                        } else if (this.userWidth > 9) {
                            this.isDrawBaget = true;
                            this.countBagetParameters();
                        }
                    }
                    this.countPrice();
                } else {
                    this.userHeight = 400;
                    this.countPrice();
                }
            } else {
                this.userHeight = '';
            }
        },
        countBagetParameters() {
            this.uploadedImgSrc = '';
            const width = this.userWidth;
            const height = this.userHeight;
            this.countScale(width, height);
            this.bagetWidth = this.countScaledValue(width, this.scale);
            this.bagetHeight = this.countScaledValue(height, this.scale);
            this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
            this.borderWidth = this.countScaledValue(this.selectedBagetItem.borderWidth, this.scale);
            if (this.cropImgMode) {
                const imgWidth = width - (2 * this.selectedBagetItem.borderWidth) + (2 * this.selectedBagetItem.indent);
                const imgHeight = height - (2 * this.selectedBagetItem.borderWidth) + (2 * this.selectedBagetItem.indent);
                this.imgWidth = this.countScaledValue(imgWidth, this.scale);
                this.imgHeight = this.countScaledValue(imgHeight, this.scale);
            }
        },
        countEmptyBaget() {
            const width = this.userWidth;
            const height = this.userHeight;
            this.countScale(width, height);
            this.bagetWidth = this.countScaledValue(width, this.scale);
            this.bagetHeight = this.countScaledValue(height, this.scale);
            this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
            this.borderWidth = this.countScaledValue(this.selectedBagetItem.borderWidth, this.scale);
        },
        countScale(width, height) {
            const widthScale = this.scaleFunction(width, 600);
            const heightScale = this.scaleFunction(height, 400);
            this.scale = Math.min(widthScale, heightScale);
        },
        scaleFunction(value, max) {
            let count = 1;
            for (value; value * 2 <= max; ) {
                count++;
                value = value * 2;
            }
            return count;
        },
        countScaledValue(startValue, scale) {
            for (let i = 1; i < scale; i++) {
                startValue = startValue * 2;
            }
            return startValue;
        },
        selectBaget(item) {
            this.bagetsList.forEach(el => {
                el.selected = false;
            });
            item.selected = true;
            this.selectedBagetItem = item;
            if (this.cropImgMode && this.userWidth && this.userHeight) {
                this.countBagetParameters();
            }
        },
        changeCoating() {
            this.countPrice();
        },
        changeMaterial() {
            this.countPrice();
        },
        countPrice() {
            let startValue = 0;
            let priceForCentimeter = 0;
            let priceBagetСoating = 0;
            let perimeter = 2 * (+this.userWidth + +this.userHeight);
            if (perimeter <= 100) {
                if (this.bagetMaterial === 'Ольха' ) {
                    startValue = 30;
                    priceForCentimeter = 0.5;
                } else if (this.bagetMaterial === 'Дуб') {
                    startValue = 50;
                    priceForCentimeter = 1;
                }
            } else {
                if (this.bagetMaterial === 'Ольха' ) {
                    priceForCentimeter = 0.5;
                } else if (this.bagetMaterial === 'Дуб') {
                    priceForCentimeter = 1;
                }
            }
            if (this.bagetСoating === 'Покраска' ) {
                priceBagetСoating = 10;
            } else if (this.bagetСoating === 'Патина') {
                priceBagetСoating = 20;
            }
            this.price = startValue + (perimeter * priceForCentimeter) + priceBagetСoating;
        }
    }, 
    mounted() {
        this.selectedBagetItem = this.bagetsList[0];
    }
});