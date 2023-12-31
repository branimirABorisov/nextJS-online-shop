import { CartContextProvider } from '@/components/Cartcontext';
import { createGlobalStyle } from 'styled-components'


const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  	body{
      padding: 0;
      margin: 0;
      font-family: 'Roboto', sans-serif;
      background-color: #e9ebee;
    }

`;

export default function App({ Component, pageProps }) {
  return (
    <>
    <GlobalStyles />
    <CartContextProvider>
    < Component {...pageProps } />
    </CartContextProvider>
    </>

  )

}
