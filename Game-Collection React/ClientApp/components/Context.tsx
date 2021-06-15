//import * as React from 'react';

//type ContextProps = {
//    authenticated: boolean,
//    lang: string,
//    theme: string
//};

//// we initialise them without default values, to make that happen, we
//// apply the Partial helper type.
//export const AppContext =
//    React.createContext<Partial<ContextProps>>({});

//const Header = () => {
//    return <AppContext.Consumer>
//        {
//            ({ authenticated }) => {
//                if (authenticated) {
//                    return <h1>Logged in!</h1>
//                }
//                return <h1>You need to sign in</h1>
//            }
//        }
//    </AppContext.Consumer>
//}

//// Now, we can set only the properties we really need
//const App = () => {
//    return <AppContext.Provider value={{
//        authenticated: true,
//    }}>
//        <Header />
//    </AppContext.Provider>
//}