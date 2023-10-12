<script>
import NewForm from './components/NewForm.vue'
import CurrForm from './components/CurrForm.vue'
import mainSelector from './components/mainSelector.vue'

export default {
    name: 'App',
    data() {
        return{
            selectedCategory: 'all',
            newContactToggle: false,
            currContactToggle: false,
            col: 0,
            notify: false,
            current: 'text',
            created: false,
            edited: false,
            deleted: false,
            type: 0
        } 
    },
    components: {
      NewForm,
      CurrForm,
      mainSelector,
    },
    methods: {
        newContact(){
            this.$refs.clearErr.clearErr()
            return this.newContactToggle = !this.newContactToggle;
        },
        currContact(){
            return this.currContactToggle = !this.currContactToggle;
        },
        isNotify(type) {
            this.notify = true;
            switch(type){
                case 1: {
                    this.created = true;
                    break;
                }
                case 2: {
                    this.edited = true;
                    break;
                }
                case 3: {
                    this.deleted = true;
                    this.currContact();
                    break;
                }
            }
            setTimeout(() => {
                this.notify = false;
                this.created = false;
                this.edited = false;
                this.deleted = false;
            }, 3000);
            
        },
        currEdit(name, id){
            this.current = name;
            this.$store.dispatch('currId', id);
        },
        selectorToggle(){
            this.selectToggle = !this.selectToggle;
        },
        updSelect(){
            this.selectedCategory = this.$store.getters.selectedCategory
        }
    },
    computed: {
    // Получение контактов из хранилища через геттер
        contacts() {
            return this.$store.getters.allContacts;
        },
        filteredContacts() {
            console.log(this.selectedCategory);
            if (this.selectedCategory === 'all') {
                return this.$store.getters.allContacts;
            } else {
                // Фильтрация контактов по выбранной категории
                return this.$store.getters.allContacts.filter(contact => contact.category === this.selectedCategory);
            }
        },
    },
}


</script>

<template>
  <header class="header">
            <div class="top-head cont">
                <img src="./assets/media/logo.svg">
                <h1>Книга контактов</h1>
            </div>
            <div class="bottom-head">
                <div class="bottom-head__content cont">
                    <mainSelector @select="updSelect"/>
                    <button class="add-contact" @click="newContact()">
                        <img src="./assets/media/add.svg">
                        <p>Добавить <span>контакт</span></p>
                    </button>
                </div>
            </div>
        </header>
        <section class="contacts cont">
            <div class="contacts__content">
                <div class="con-head">
                    <p class="con-unit__name">Название</p>
                    <p class="con-head__tel hide">Телефон</p>
                    <p class="con-head__email hide">E-mail</p>
                    <p class="con-head__telmail show">Телефон / E-mail</p>
                    <p class="con-head__date">Создан</p>
                </div>
                <div class="contacts__panel" v-for="contact in filteredContacts" :key="contact.id">
                    <div class="con-unit edit-contact" @click="currContact();currEdit(contact.name, contact.id);$refs.curr.contact()">
                        <div class="con-unit__name">
                            <div class="con-unit__icon">{{contact.name[0]}}</div>
                            <p>{{contact.name}}</p>
                        </div>
                        <p class="con-unit__tel hide">{{contact.phone}}</p>
                        <p class="con-unit__email hide">{{contact.email}}</p>
                        <p class="con-unit__telmail show">{{contact.phone}}<br/>{{contact.email}}</p>
                        <p class="con-unit__date">{{contact.createdAt}}</p>
                    </div>
                </div>
            </div>
        </section>
    
        <section :class="['new-contact', { 'active': newContactToggle }]">
            <div class="new-header">
                <div class="new-header__name">
                    <img src="./assets/media/cont-icon.svg">
                    <p>Добавить контакт</p>
                </div>
                <div class="new-header__close new-contact__close" @click="newContact()">
                    <img src="./assets/media/cross.svg">
                </div>
            </div>
            <div class="new-contact__content cont">
                <!--Форма для добавления нового контакта-->
                <!-- <NewForm @contact-data-submitted="addContactData"/> -->
                <NewForm ref="clearErr" @success="isNotify(1)"/>
            </div>
        </section>
    
        <section :class="['curr-contact',{ 'active': currContactToggle }]">
            <div class="curr-header">
                <div class="curr-header__name">
                    <div class="curr-header__icon">{{this.current[0]}}</div>
                    <p>{{this.current}}</p>
                </div>
                <div class="curr-header__close curr-contact__close" @click="currContact()">
                    <img src="./assets/media/cross.svg">
                </div>
            </div>
            <div class="curr-contact__content cont">
                <CurrForm ref="curr" @success="isNotify(2)" @deleted="isNotify(3)"/>
            </div>
        </section>
        <div :class="['notificator',{ 'active': notify }]">
            <div>
                <img src="./assets/media/notificator.svg">
                <span :class="{ 'created': created }">Контакт успешно создан</span>
                <span :class="{ 'edited': edited }">Контакт успешно изменен</span>
                <span :class="{ 'deleted': deleted }">Контакт успешно удален</span>
            </div>
        </div>
</template>
