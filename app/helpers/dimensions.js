import { Screen } from '@nativescript/core';

export const screenWidth = Screen.mainScreen.widthDIPs;
export const screenHeight = Screen.mainScreen.heightDIPs;
export const get_height_percent = percent => (screenHeight/100)*percent
export const get_width_percent = percent => (screenWidth/100)*percent