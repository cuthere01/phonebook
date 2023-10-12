<script>
import formSelector from '@/components/formSelector.vue'
import { IMaskDirective } from 'vue-imask';

export default{
    data() {
        return {
            contactId: 0,
            name: null,
            phone: null,
            email: null,
            category: null,
            createdAt: (new Date().toISOString().slice(0,10).split('-').reverse().join('.')),
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
            let mailMask = /^[^\s()<>@,;/]+@\w[\w-]+\.[a-z]{2,}$/i;
            this.clearErr();
            if(this.name && !(this.name.length<4) && this.phone && this.email && mailMask.test(this.email)){
                this.loader = true;
                setTimeout(() => {
                    this.$store.dispatch('updateContact', {
                    id: this.contactId,
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    category: this.category,
                    createdAt: this.createdAt
                    });
                this.loader = false;
                this.$emit('success');
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
        contact() {
            this.contactId = this.$store.state.currentid;
            const tmp = this.$store.state.contacts.find(contact => contact.id === this.contactId);
            // console.log(this.$store.state.contacts.find(contact => contact.id === this.contactId).name,this.$store.state.currentid,this.contactId);
            this.name = tmp.name;
            this.phone = tmp.phone;
            this.email = tmp.email;
            this.category = tmp.category;
            this.$refs.set.setCategory(this.category);
            this.clearErr();
        },
        deleteContact() {
            this.$store.dispatch('deleteContact', this.contactId);
            this.$emit('deleted');
        },
    },
    directives: {
        imask: IMaskDirective
    }
}
</script>

<template>
    <div class="curr-form">
        <h2>Контакт</h2>
        <form id="currContact" @submit.prevent="onSubmit">
            <div class="curr-form__panel">
                <div :class="['curr-form__field',{ 'curr-form__err': nameError != null }]">
                    <div class="curr-form__row">
                        <p>Имя</p>
                        <input name="name" v-model="name" placeholder="Например «Андрей»..." type="text">
                    </div>
                    <span>{{ nameError }}</span>
                </div>
                <div :class="['curr-form__field',{ 'curr-form__err': phoneError != null }]">
                    <div class="curr-form__row">
                        <p>Телефон</p>
                        <input name="phone" v-model="phone" class="masked" placeholder="Например +7(987)654-78-09" v-imask="mask" type="text">
                    </div>
                    <span>{{ phoneError }}</span>
                </div>
                <div :class="['curr-form__field',{ 'curr-form__err': emailError != null }]">
                    <div class="curr-form__row">
                        <p>E-mail</p>
                        <input name="email" v-model="email" placeholder="Например «pochta@domain.ru»..." type="text" >
                    </div>
                    <span>{{ emailError }}</span>
                </div>
                <div :class="['curr-form__field',{ 'curr-form__err': categoryError != null }]">
                    <div class="curr-form__row">
                        <p>Категория</p>
                        <!-- <select name="email" v-model="category">
                            <option :selected="true" value="colleagues">Коллеги</option>
                            <option value="relatives">Родственники</option>
                        </select> -->
                        <formSelector ref="set" @relatives="setRelatives" @colleagues="setColleagues"/>
                    </div>
                    <span>{{ categoryError }}</span>
                </div>
                <div class="curr-form__field">
                    <div class="curr-form__row">
                        <p>Создан</p>
                        <span class="curr-form__date">{{ createdAt }}</span>
                    </div>
                </div>
            </div>
            <div class="btns">
                <div class="btns__filler"></div>
                <div class="curr-form__btns">
                    <button :class="['new-form__save',{ 'active': loader }]" type="submit">
                        <img src="@/assets/media/file.svg" :class="['file',{ 'active': !loader }]">
                        <img src="@/assets/media/loader.svg" :class="['loader',{ 'active': loader }]">
                        <span>Сохранить</span>
                    </button>
                    <a class="curr-form__del" @click="deleteContact">
                        <img src="@/assets/media/bin.svg">
                        <span>Удалить контакт</span>
                    </a>
                </div>
            </div>
        </form>
    </div>
</template>
