<template>
    <div class="app">
        <div class="app__row">
            <a href="#" @click="changeApiKey">Change API Key</a>
            <span v-if="apiKey">
                <a href="#" @click="view = 1">Contact List</a>
            </span>
        </div>
        <div class="app__row" v-if="apiKey">
            <ContactList v-if="view === 1" :api-key="apiKey">
        </div>
    </div>
</template>

<script lang="ts">
import ContactList from './ContactList.vue';

export default {
    components: {
        ContactList
    },
    data() {
        return {
            apiKey: localStorage.getItem('apiKey'),
            view: 0,
        };
    },
    methods: {
        changeApiKey() {
            const apiKey = prompt('SendGrid API Key:');
            if (apiKey?.startsWith('SG.')) {
                localStorage.setItem('apiKey', this.apiKey = apiKey.trim());
            } else {
                alert('API Key should starts with "SG."');
            }
        },
    },
};
</script>
