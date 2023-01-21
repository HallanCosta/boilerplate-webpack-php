import { $event, $el } from '@app/utils';

export function Home() {
  console.log('> Start page home');

  $event('click', document.body, function() {
    console.log('> Clicked body: Javascript and alias OK');
  });
}