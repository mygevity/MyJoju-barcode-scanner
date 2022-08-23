<dockLayout
    class={classes}
    stretchLastChild="false"
    {height}
    horizontalAlignment="{centered ? 'center' : 'left'}"
    {width}
    verticalAlignment="middle"
    on:tap={() => dispatch('tap')}
    backgroundColor={background_color}
>
    <slot />
</dockLayout>
<script>
import { createEventDispatcher } from 'svelte';

export let background_color;
export let centered = false;
export let classes = '';
export let height = '100%';
export let width = '100%';

const dispatch = createEventDispatcher();
</script>