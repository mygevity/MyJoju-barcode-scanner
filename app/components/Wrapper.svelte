<page
    on:navigatedTo={on_navigated_to}
>
    <scrollView>
        <stackLayout>
            <slot/>
        </stackLayout>
    </scrollView>
</page>
<script>
export let on_navigated_to = () => {}
</script>