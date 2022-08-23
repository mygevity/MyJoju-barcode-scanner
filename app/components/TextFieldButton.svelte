<label
    class="1 -mb-0.5"
    text={label}
    textWrap={true}  
/>
<dockLayout
    backgroundColor="#FAFBFC"
    boxShadow="1 1 0.5 0.5 rgba(0, 0, 0, 0.4)"
    borderRadius="5%"
    class="my-1.25"
    stretchLastChild={false}
    {height}
    {width}
    on:loaded={event => dispatch('loaded', event)}
    id="search-field-dock"
>
    <textField
        bind:text
        class="1 grey-300"
        {hint}
        {secure}
        keyboardType="{number ? 'number' : email ? 'email' : null}"
        maxLength={length || Infinity}
        style="placeholder-color: #90A4AE"
        dock="left"
        borderBottomColor="transparent"
        width="80%"
        id="textfield-dock"
        fontWeight="500"
        on:textChange={event => dispatch('text-changed', event)}
        on:tap={() => dispatch('text-tap')}
        on:loaded={event => {if (focus_on_loaded) event.object.focus()}}
    />
</dockLayout>

<script>
import { createEventDispatcher } from 'svelte';

export let button_text = '\uf02a';
export let classes = 'my-1.25';
export let email = false;
export let focus_on_loaded = false;
export let height;
export let hint = '';
export let label = '';
export let length;
export let number = false;
export let secure = false;
export let text = '';
export let width = '100%';

const dispatch = createEventDispatcher();
</script>