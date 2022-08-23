import { ToastPosition, Toasty } from '@triniwiz/nativescript-toasty';

export default text => {
    const toast = new Toasty({ text, position: ToastPosition.TOP });
    return toast.show();
}