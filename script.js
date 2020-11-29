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
        croppedImg: {},
        bagetWidth: 0,
        bagetHeight: 0,
        borderWidth: 0,
        imgHeight: 0,
        imgWidth: 0,
        sideContainerWidth: 0,
        scale: 0,
        selectedBagetItem: null,
        bagetsList: [
            {
                id: 1,
                preview: 'images/baget1.jpeg',
                horImg: 'url("images/baget1.jpeg")',
                vertImg: 'url("images/baget1-1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: true
            },
            {
                id: 2,
                preview: 'images/baget2.jpeg',
                horImg: 'url("images/baget2.jpeg")',
                vertImg: 'url("images/baget2-1.png")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 3,
                preview: 'images/baget3.jpeg',
                horImg: 'url("images/baget3.jpeg")',
                vertImg: 'url("images/baget3-1.png")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            },
            {
                id: 4,
                preview: 'images/baget1.jpeg',
                horImg: 'url("images/baget1.jpeg")',
                vertImg: 'url("images/baget1-1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: false
            },
            {
                id: 5,
                preview: 'images/baget2.jpeg',
                horImg: 'url("images/baget2.jpeg")',
                vertImg: 'url("images/baget2-1.png")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 6,
                preview: 'images/baget3.jpeg',
                horImg: 'url("images/baget3.jpeg")',
                vertImg: 'url("images/baget3-1.png")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            },{
                id: 7,
                preview: 'images/baget1.jpeg',
                horImg: 'url("images/baget1.jpeg")',
                vertImg: 'url("images/baget1-1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: false
            },
            {
                id: 8,
                preview: 'images/baget2.jpeg',
                horImg: 'url("images/baget2.jpeg")',
                vertImg: 'url("images/baget2-1.png")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 9,
                preview: 'images/baget3.jpeg',
                horImg: 'url("images/baget3.jpeg")',
                vertImg: 'url("images/baget3-1.png")',
                borderWidth: 5,
                indent: 1.3,
                selected: false
            },
            {
                id: 10,
                preview: 'images/baget1.jpeg',
                horImg: 'url("images/baget1.jpeg")',
                vertImg: 'url("images/baget1-1.jpg")',
                borderWidth: 4,
                indent: 1,
                selected: false
            },
            {
                id: 11,
                preview: 'images/baget2.jpeg',
                horImg: 'url("images/baget2.jpeg")',
                vertImg: 'url("images/baget2-1.png")',
                borderWidth: 3,
                indent: 0.5,
                selected: false
            },
            {
                id: 12,
                preview: 'images/baget3.jpeg',
                horImg: 'url("images/baget3.jpeg")',
                vertImg: 'url("images/baget3-1.png")',
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
            },1);
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
                } else {
                    this.userWidth = 600;
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
                } else {
                    this.userHeight = 400;
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
            // if (value === 0) {
            //     return 0;
            // } else {
                let count = 1;
                for (value; value * 2 <= max; ) {
                    count++;
                    value = value * 2;
                }
                return count;
            // }
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
            if (this.cropImgMode) {
                this.countBagetParameters();
            }
        }
    }, 
    mounted() {
        this.selectedBagetItem = this.bagetsList[0];
    }
});