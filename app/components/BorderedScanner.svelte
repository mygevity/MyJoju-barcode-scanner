<absoluteLayout
    height={get_height_percent(45)}
>
    <barcodeScanner
        height={get_height_percent(45)}
        width="100%"
        formats="QR_CODE, EAN_13, UPC_A"
        beepOnScan="true"
        preferFrontCamera="false"
        reportDuplicates="true"
        on:scanResult={event => dispatch('scan-result', { text: event.text, object: event.object })}
        requestCameraPermission
        top="0"
    />
    <stackLayout
        height={get_height_percent(45)}
        borderColor="rgba(0, 0, 0, 0.4)"
        borderWidth="50"
        width="100%"
        top="0"
        marginTop="1"
        backgroundColor="transparent"
        color="transparent"
    />
</absoluteLayout>
<script>
import { createEventDispatcher } from 'svelte';
import { get_height_percent } from '~/helpers/dimensions';

const dispatch = createEventDispatcher();
</script>