import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

//mui dark theme for app layout
const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

const Layout = ({children}) => {

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Header/>
        {children}
        <Footer/>
    </ThemeProvider>
  )
}

export default Layout
