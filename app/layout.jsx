import styles from '@styles/globals.css'
import Nav from '@components/Nav'
//provides session data to the app
import Provider from '@components/Provider'

//data about the page
export const metadata = {
    title : "In Promptoo",
    description : "In Promptoo is a platform for discovering and sharing prompts"
}   


const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"></div>
                </div>
                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout