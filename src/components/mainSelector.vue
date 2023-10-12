<script>

export default{
    data() {
        return {
            selectedCategory: 'all',
            select: [true,false,false],
            selectToggle: false,
            type: 0
        }
    },
    methods: {
        selectorToggle(){
            this.selectToggle = !this.selectToggle;
        },
        selector(type){
            for(let i=0; i<this.select.length;i++){
                if(i != type)
                    this.select[i] = false;
            }
            switch(type){
                case 0: {
                    this.select[0] = true;
                    this.selectedCategory = 'all';
                    break;
                }
                case 1: {
                    this.select[1] = true;
                    this.selectedCategory = 'relatives';
                    break;
                }
                case 2: {
                    this.select[2] = true;
                    this.selectedCategory = 'colleagues';
                    break;
                }
            }
            this.$store.dispatch('selectCategory', this.selectedCategory);
            //let cat = this.$store.getters.selectedCategory;
            this.$emit('select');
            this.selectorToggle();
        }
    },
}
</script>

<template>
    <div class="selector">
        <div class="selector__curr" @click="selectorToggle()" :class="{ 'active': selectToggle }">
            <span :class="{ 'sel1': select[0] }">Все</span>
            <span :class="{ 'sel2': select[1] }">Родственники</span>
            <span :class="{ 'sel3': select[2] }">Коллеги</span>
            <img src="@/assets/media/arrow.svg">
        </div>
        <div :class="['selector__field',{ 'active': selectToggle }]">
            <div class="selector__row" :class="{ 'opt1': select[0] }" @click="selector(0)">
                <span>Все</span>
                <img src="@/assets/media/mark.svg" >
            </div>
            <div class="selector__row" :class="{ 'opt2': select[1] }" @click="selector(1)">
                <span>Родственники</span>
                <img src="@/assets/media/mark.svg">
            </div>
            <div class="selector__row" :class="{ 'opt3': select[2] }" @click="selector(2)">
                <span>Коллеги</span>
                <img src="@/assets/media/mark.svg">
            </div>
        </div>
    </div>
</template>
