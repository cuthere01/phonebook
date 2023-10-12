<script>

export default{
    data() {
        return {
            selectedCategory: null,
            select: [true,false,false],
            selectToggle: false,
            type: 0
        }
    },
    methods: {
        selectorToggle(){
            this.selectToggle = !this.selectToggle;
        },
        setCategory(cat){
            this.selectedCategory = cat;
            if(this.selectedCategory == 'relatives')
                this.select = [false,true,false];
                if(this.selectedCategory == 'colleagues')
                this.select = [false,false,true];
        },
        clear(){
            this.select = [true,false,false];
        },
        selector(type){
            for(let i=0; i<this.select.length;i++){
                if(i != type)
                    this.select[i] = false;
            }
            switch(type){
                case 1: {
                    this.select[1] = true;
                    this.selectedCategory = 'relatives';
                    this.$emit('relatives');
                    break;
                }
                case 2: {
                    this.select[2] = true;
                    this.selectedCategory = 'colleagues';
                    this.$emit('colleagues');
                    break;
                }
            }
            this.selectorToggle();
        }
    },
}
</script>

<template>
    <div class="form-selector">
        <div class="form-selector__curr" @click="selectorToggle()" :class="{ 'active': selectToggle }">
            <span :class="{ 'sel1': select[0] }" style="color: #A9A9A9;">Не выбрано</span>
            <span :class="{ 'sel2': select[1] }">Родственники</span>
            <span :class="{ 'sel3': select[2] }">Коллеги</span>
            <img src="@/assets/media/arrow.svg">
        </div>
        <div :class="['form-selector__field',{ 'active': selectToggle }]">
            <div class="form-selector__row" :class="{ 'opt1': select[1] }" @click="selector(1)">
                <span>Родственники</span>
                <img src="@/assets/media/mark.svg" >
            </div>
            <div class="form-selector__row" :class="{ 'opt2': select[2] }" @click="selector(2)">
                <span>Коллеги</span>
                <img src="@/assets/media/mark.svg">
            </div>
        </div>
    </div>
</template>
