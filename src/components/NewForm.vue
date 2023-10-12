<script>
import formSelector from '@/components/formSelector.vue'
import { IMaskDirective } from 'vue-imask';

export default{
    data() {
        return {
            id: 1,
            name: null,
            phone: null,
            email: null,
            category: null,
            nameError: null,
            phoneError: null,
            emailError: null,
            categoryError: null,
            loader: false,
            mask: {
                mask: '+{7}(000)000-00-00',
                lazy: false
            },
        }
    },
    components: {
        formSelector
    },
    methods: {
        setRelatives(){
            this.category = 'relatives';
        },
        setColleagues(){
            this.category = 'colleagues'
        },
        clearErr(){
            this.nameError = null;
            this.phoneError = null;
            this.emailError = null;
            this.categoryError = null;
        },
        onSubmit(){
            let mailMask = /^[^\s()<>@,;]+@\w[\w-]+\.[a-z]{2,}$/i;
            this.clearErr();
            if(this.name && !(this.name.length<4) && this.phone && this.email && mailMask.test(this.email) && this.category){
                // let contactData = {
                //     name: this.name,
                //     phone: this.phone,
                //     email: this.email
                // }
                // this.$emit('contact-data-submitted', contactData);
                this.loader = true;
                setTimeout(() => {
                    this.$store.dispatch('addContact', {
                    id: this.id,
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    category: this.category,
                    createdAt: (new Date().toISOString().slice(0,10).split('-').reverse().join('.')),
                    });
                this.id = this.id+=1;
                this.name = null;
                this.phone = null;
                this.email = null;
                this.category = null;
                this.loader = false;
                this.$emit('success');
                this.$refs.clear.clear();
                }, 1000);
            }
            else{
                const tmp = "Поле не может быть пустым";
                if(!this.name) this.nameError = tmp;
                else if(this.name.length<4) this.nameError = "Слишком короткое имя";
                if(!this.phone) this.phoneError = tmp;
                if(!this.email) this.emailError = tmp;
                else if(!mailMask.test(this.email)) this.emailError = "Некорректный email";
                if(!this.category) this.categoryError = tmp;
            }
            
        },
    },
    directives: {
        imask: IMaskDirective
    }
}


</script>

<template>
  <div class="new-form">
        <h2>Новый контакт</h2>
        <form id="newContact" @submit.prevent="onSubmit">
            <div class="new-form__panel">
                
                <div :class="['new-form__field',{ 'new-form__err': nameError != null }]">
                    <div class="new-form__row">
                        <p>Имя</p>
                        <input name="name" v-model="name" placeholder="Например «Андрей»..." type="text">
                    </div>
                    <span>{{ nameError }}</span>
                </div>
                <div :class="['new-form__field',{ 'new-form__err': phoneError != null }]">
                    <div class="new-form__row">
                        <p>Телефон</p>
                        <!-- <input :value="value" v-imask="mask" @accept="onAccept" @complete="onComplete"> -->
                        <!-- <phoneMask/> -->
                        <input name="phone" v-model="phone" placeholder="Например +7(987)654-78-09" v-imask="mask" type="text">
                    </div>
                    <span>{{ phoneError }}</span>
                </div>
                <div :class="['new-form__field',{ 'new-form__err': emailError != null }]">
                    <div class="new-form__row">
                        <p>E-mail</p>
                        <input name="email" v-model="email" placeholder="Например «pochta@domain.ru»..." type="text" >
                    </div>
                    <span>{{ emailError }}</span>
                </div>
                <div :class="['new-form__field',{ 'new-form__err': categoryError != null }]">
                    <div class="new-form__row">
                    <p>Категория</p>
                    <!-- <select name="email" v-model="category">
                        <option :selected="true" value="colleagues">Коллеги</option>
                        <option value="relatives">Родственники</option>
                    </select> -->
                    <formSelector ref="clear" @relatives="setRelatives" @colleagues="setColleagues"/>
                    </div>
                    <span>{{ categoryError }}</span>
                </div>
            </div>
            <div class="btn">
                <div class="btn__filler"></div>
                <div class="new-form__btn">
                    <button type="submit" :class="['new-form__save',{ 'active': loader }]">
                        <img src="@/assets/media/file.svg" :class="['file',{ 'active': !loader }]">
                        <img src="@/assets/media/loader.svg" :class="['loader',{ 'active': loader }]">
                        <span>Сохранить</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
