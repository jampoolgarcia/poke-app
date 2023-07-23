import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>SSR-list</div>
});

export const head: DocumentHead = {
  title: "SSR List",
};