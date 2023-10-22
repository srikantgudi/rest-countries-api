import { writable } from "svelte/store";

export const mode = writable({
  val: 'lite',
  label: 'Dark'
});
