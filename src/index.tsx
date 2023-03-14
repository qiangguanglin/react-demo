import {Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'


const domContainer:HTMLElement = document.getElementById('root') || document.createElement('div');
const root = createRoot(domContainer);
root.render(
  <Suspense>
    <App></App>
  </Suspense>
);