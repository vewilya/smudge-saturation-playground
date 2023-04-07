import { writable, readable } from 'svelte/store'

export const data = writable([]);
export const scopeData = writable([]);
export const sineScopeData = writable([]);
export const frameCount = writable(0);
export const windowWidth = writable(1000);

export const masterLevel = writable(.5);
export const mixLevel = writable(.5);
export const masterDrive = writable(1.0);
export const masterSine = writable(1.0);
export const hCutV = writable(1.0);
export const bumpV = writable(0.0);

export const valA = writable(1);
export const valB = writable(1);
export const valC = writable(1);
export const valD = writable(1);

export const isOn = writable(false);

export const col = writable([]);