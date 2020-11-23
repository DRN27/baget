const app = new Vue({
    el: '#app',
    data: {
        uploadedImgSrc: '',
        bagetWidth: 0,
        bagetHeight: 0,
        borderWidth: 4,
        sideContainerWidth: '',
        widthScale: 1,
        heightScale: 1,
        hiddenWidth: 0,
        hiddenHeight: 0,
        startWidth: '',
        startHeight: '',
        emptyMode: false,
        canvas: null,
        display: true,
        cropMode: false,
        croppedImgWidth: 0,
        croppedImgHeight: 0,
        croppedImgSrc: '',
        bagetMaterial: 'Ольха',
        blockInputs: false
    },
    methods: {
        uploadImg() {
            this.$refs.upload.click();
        },

        showImg(event) {
            if (event.target.files) {
                this.uploadedImgSrc = URL.createObjectURL(event.target.files[0]);
                
                setTimeout(()=> {
                    const img = this.$refs.uploadedImg;
                    const croppedImg = this.$refs.croppedImg;

                    cropper = new Cropper(img, {
                        viewMode: 1,
                        crop(event) {
                            canvas = this.cropper.getCroppedCanvas();
                            croppedImg.src = canvas.toDataURL("image/png");
                        },
                    });
                }, 1)
            }
            this.blockInputs = true;
        },

        setWidth(event) {
            if (!this.blockInputs) {
                if (this.startWidth >= 10 && this.startWidth <= 600) {
                    if (this.cropMode) {
                        const croppedImg = this.$refs.cropBaget;
                        // потом подставлять динамическое значение
                        this.borderWidth = 4;
                        this.bagetHeight = Math.round(this.croppedImgHeight * this.startWidth / this.croppedImgWidth);
                        this.startHeight = Math.round(this.bagetHeight);
                        this.bagetWidth = this.startWidth;
                        this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                        this.emptyMode = true;
                        this.heightScale = this.scale(this.bagetHeight, 400, 'height');
                        this.widthScale = this.scale(this.bagetWidth, 600, 'width');
                        this.bagetWidth = this.sideScale(this.bagetWidth, Math.min(this.heightScale, this.widthScale));
                        this.bagetHeight = this.sideScale(this.bagetHeight, Math.min(this.heightScale, this.widthScale));
                        this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                        this.borderWidth = this.sideScale(this.borderWidth, Math.min(this.heightScale, this.widthScale));
                        croppedImg.height = this.bagetHeight - 2 * this.borderWidth + 2;
                        croppedImg.width = this.bagetWidth - 2 * this.borderWidth + 2;
                        croppedImg.src = this.croppedImgSrc;
                    } else {
                        if (this.startWidth === '' && this.startHeight === '') {
                            this.emptyMode = false;
                        } else {
                            this.emptyMode = true;
                            // потом подставлять динамическое значение
                            this.borderWidth = 4;
                            this.startWidth = +event.target.value;
                            this.widthScale = this.scale(+this.startWidth, 600, 'width');
                            if (this.heightScale > 1 && this.widthScale > 1) {
                                this.bagetWidth = this.sideScale(+this.startWidth, Math.min(this.heightScale, this.widthScale));
                                this.bagetHeight = this.sideScale(+this.startHeight, Math.min(this.heightScale, this.widthScale));
                                this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                                this.borderWidth = this.sideScale(this.borderWidth, Math.min(this.heightScale, this.widthScale));
                            } else if (this.bagetHeight > 0){
                                this.bagetWidth = this.startWidth;
                                this.bagetHeight = this.startHeight;
                                this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                            }
                        }
                    }
                }
            } else {
                this.startWidth = '';
            }
        },

        setHeight(event) {
            if (!this.blockInputs) {
                if (this.startHeight >= 10 && this.startHeight <= 400) {
                    if (this.cropMode) {
                        const croppedImg = this.$refs.cropBaget;
                        // потом подставлять динамическое значение
                        this.borderWidth = 4;
                        this.bagetWidth = Math.round(this.croppedImgWidth * this.startHeight / this.croppedImgHeight);
                        this.startWidth = Math.round(this.bagetWidth);
                        this.bagetHeight = this.startHeight;
                        this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                        this.emptyMode = true;
                        this.heightScale = this.scale(this.bagetHeight, 400, 'height');
                        this.widthScale = this.scale(this.bagetWidth, 600, 'width');
                        this.bagetWidth = this.sideScale(this.bagetWidth, Math.min(this.heightScale, this.widthScale));
                        this.bagetHeight = this.sideScale(this.bagetHeight, Math.min(this.heightScale, this.widthScale));
                        this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                        this.borderWidth = this.sideScale(this.borderWidth, Math.min(this.heightScale, this.widthScale));
                        croppedImg.height = this.bagetHeight - (2 * this.borderWidth) + 2;
                        croppedImg.width = this.bagetWidth - (2 * this.borderWidth) + 2;
                        croppedImg.src = this.croppedImgSrc;
                        this.$forceUpdate();
                    } else {
                        if (this.startWidth === '' && this.startHeight === '') {
                            this.emptyMode = false;
                        } else {
                            this.emptyMode = true;
                            // потом подставлять динамическое значение
                            this.borderWidth = 4;
                            this.startHeight = +event.target.value;
                            this.heightScale = this.scale(+this.startHeight, 400, 'height');
                            if (this.widthScale > 1 && this.heightScale > 1) {
                                this.bagetWidth = this.sideScale(+this.startWidth, Math.min(this.heightScale, this.widthScale));
                                this.bagetHeight = this.sideScale(+this.startHeight, Math.min(this.heightScale, this.widthScale));
                                this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                                this.borderWidth = this.sideScale(this.borderWidth, Math.min(this.heightScale, this.widthScale));
                            } else  if (this.bagetWidth > 0) {
                                this.bagetWidth = this.startWidth;
                                this.bagetHeight = this.startHeight;
                                this.sideContainerWidth = Math.sqrt((this.bagetHeight * this.bagetHeight) / 2);
                            }
                        }
                    }
                }
            } else {
                this.startHeight = '';
            }
        },

        scale(value, max, scaleName) {
            if (value === 0) {
                return 1;
            } else {
                let count = 1;
                for (value; value * 2 <= max; ) {
                    count++;
                    value = value * 2;
                }
                return count;
            }
        },

        sideScale(startValue, scale) {
            if (startValue === 0) {
                return 0;
            } else {
                for (let i = 1; i < scale; i++) {
                    startValue = startValue * 2;
                }
                return startValue;
            }
        },

        crop() {
            this.display = false;
            const croppedImg = this.$refs.croppedImg;
            this.croppedImgHeight = croppedImg.height;
            this.croppedImgWidth = croppedImg.width;
            if (this.croppedImgHeight > this.croppedImgWidth) {
                this.croppedImgHeight = 400;
                this.croppedImgWidth = this.croppedImgWidth * 400 / croppedImg.height;
            }
            this.croppedImgSrc = croppedImg.src;
            this.cropMode = true;
            this.blockInputs = false;
        }
    },
    mounted() {

    },

});