<Wrapper
    on_navigated_to={ask_for_login}
>
    {#if isIOS}
        <BorderedScanner
            on:scan-result={event => on_scan_result(event)}
        />
    {/if}
    <label 
        text="Barcode"
        textAlignment="center"
    />
    <label
        text={barcode}
        textAlignment="center"
    />
    <button
        text="Check Barcode"
        on:tap={check_barcode}
        borderColor="#000"
        borderWidth="1"
        textWrap={true}
        textAlignment="center"
        row="0" column="0"
        padding="16"
        height="50"
    />
    {#each Object.keys($scanned_item) as key}
        <label
            text={`${$scanned_item[key]}`}
            textAlignment="center"
        />
    {/each}
    {#each found_items as item}
        <DockRow
            classes="my-1"
            height="50"
        >
            <label
                text={item.name} 
                dock="left"
                class="1"
                width="80%"
                on:tap={() => {selected_food = item; use_this_ingredient();}}
            />
            <label
                class="2"
                text="+" 
                dock="right"
                on:tap={() => {selected_food = item; use_this_ingredient();}}
            />
        </DockRow>
    {/each}
    {#if !found_items.length && $scanned_item.name}
        <button
            text="Find Manually"
            on:tap={find_manually}
            borderColor="#000"
            borderWidth="1"
            textWrap={true}
            textAlignment="center"
            row="0" column="0"
            padding="16"
            height="50"
        />
    {/if}
</Wrapper>

<script>
import { ApplicationSettings, Dialogs, isIOS } from '@nativescript/core';
import { onMount } from 'svelte';
import { navigate } from 'svelte-native';
import http from '~/helpers/http';
import lambda from '~/helpers/lambda';
import toast from '~/helpers/toast';
import { scanned_item } from '~/stores/data';
import MatchManually from './MatchManually.svelte';
import BorderedScanner from '~/components/BorderedScanner.svelte';
import DockRow from '~/components/DockRow.svelte';
import Wrapper from '~/components/Wrapper.svelte';

let barcode = '';
let found_items = [];
let email;
let password;
let query;
let selected_food;

const find_manually = () => {
    $scanned_item.barcode = barcode;
    navigate({ page: MatchManually });
}

const ask_for_login = async () => {
    let login_response;
    console.log('layout changed')
    await Dialogs.login('Login with your MyJoju account', 'Email', 'Password').then(async result => {
        email = result.userName;
        password = result.password
        login_response = await lambda.post('/login', {
            email,
            password
        })
    });
    if (!login_response.token) return ask_for_login();

    ApplicationSettings.setString('token', login_response.token);
    toast('Login Successful');
}
const check_barcode = async () => {
    let url = `https://world.openfoodfacts.org/product/${barcode}`;
    let product_page = await http.getString(url);
    $scanned_item.name = product_page.split('<title>')[1].split('</title>')[0];

    if ($scanned_item.name === 'Error') return console.log('not found');

    found_items = await lambda.post('/admin/food/search', { query: $scanned_item.name });
}

const on_scan_result = event => {
    scanner = event?.detail?.object
    barcode = event?.detail?.text;
    $scanned_item = {};
    found_items = [];
    toast(barcode);
}

const use_this_ingredient = async event => {
    const update_barcode = await action(`Assign barcode ${$scanned_item.barcode}: ${$scanned_item.name} to item ${selected_food.name}?`, 'Cancel',  ['Confirm']);
    if (update_barcode !== 'Confirm') return;
    const updated_food = await lambda.post('/admin/food/update', { id: selected_food.id, barcode: $scanned_item.barcode });
}

onMount(async () => {
    $scanned_item = {};
});
</script>
