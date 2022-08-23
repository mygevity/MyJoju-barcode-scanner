<Wrapper>
    <TextFieldButton
        hint="Search for food..."
        bind:text={search_query}
        on:tap={() => dispatch('scan-barcode')}
        focus_on_loaded
    />
    {#each ingredient_search_results as ingredient}
        <DockRow
            classes="my-1"
            height="50"
        >
            <label
                text={ingredient.name} 
                dock="left"
                class="1"
                width="80%"
                on:tap={() => {selected_food = ingredient; use_this_ingredient();}}
            />
            <label
                class="2"
                text="+" 
                dock="right"
                on:tap={() => {selected_food = ingredient; use_this_ingredient();}}
            />
        </DockRow>
    {/each}
</Wrapper>
<script>
import { createEventDispatcher } from 'svelte';
import lambda from '~/helpers/lambda';
import { scanned_item } from '~/stores/data';
import DockRow from '~/components/DockRow.svelte';
import TextFieldButton from '~/components/TextFieldButton.svelte';
import Wrapper from '~/components/Wrapper.svelte';

let selected_food;
let ingredient_search_results = [];
let search_query;

const dispatch = createEventDispatcher();

$: {
    if (search_query) search_for_ingredient();
}

$: {
    if (!search_query) ingredient_search_results = [];
}

const search_for_ingredient = async () => {
    if (!search_query.length) {
        ingredient_search_results = [];
        return;
    }

    const { results } = await lambda.post(`/admin/food/search`, {
        query: search_query
    });

    if (!results) return ingredient_search_results = [];

    ingredient_search_results = [ ...results];
    ingredient_search_results.sort((a, b) => b.ranking - a.ranking);
};

const use_this_ingredient = async event => {
    const update_barcode = await action(`Assign barcode ${$scanned_item.barcode}: ${$scanned_item.name} to item ${selected_food.name}?`, 'Cancel',  ['Confirm']);
    if (update_barcode !== 'Confirm') return;
    const updated_food = await lambda.post('/admin/food/update-barcode', { id: selected_food.id, barcode: $scanned_item.barcode });
}
</script>