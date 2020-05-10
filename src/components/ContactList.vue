<template>
    <table>
        <thead>
            <tr>
                <th>name</th>
                <th>recipient count</th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="e in items" :key="e.id">
                <td>{{ e.name }}</td>
                <td>{{ e.recipient_count }}</td>
                <td @click="deleteItem(e)">✖</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { SendGridList, SendGridLists } from '../models/contactdb';
import { SendGridErrors } from '../models/error';
import { createClient, Client } from '../client';

let client: Client;

export default {
    props: {
        apiKey: String,
    },
    data() {
        return {
            items: [] as SendGridList[]
        }
    },
    methods: {
        async deleteItem(item: SendGridList) {
            const error = await client.contactdb.lists[item.id].DELETE<SendGridErrors | null>();
            if (error) {
                this.handleErrors(error);
            }
        },
        handleErrors(e: SendGridErrors) {
            console.error(e);
            e.errors.forEach(e => alert(e.message));
        },
    },
    async mounted() {
        client = createClient('https://api.sendgrid.com/v3', {
            Authorization: `Bearer ${this.apiKey}`
        });
        const lists = await client.contactdb.lists.GET<SendGridLists | SendGridErrors>();
        if ('errors' in lists) {
            this.handleErrors(lists);
        } else {
            this.items = lists.lists;
        }
    },
};
</script>
