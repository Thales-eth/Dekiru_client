import './styles/reset.css'
import './styles/App.css'
import './routes/AppRoutes'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { useLocation } from 'react-router-dom'

const App = () => {

  const adresses = ["/posts/create", "/classes/create"]
  const regex = /^\/(reviews|posts|classes)\/(create|edit)\/.*/

  const adressesMap = new Set(adresses)

  const location = useLocation()
  const canShow = !adressesMap.has(location.pathname) && !regex.test(location.pathname)
  const isChat = location.pathname === "/conversations"

  return (
    <>
      {canShow
        &&
        <NavBar isChat={isChat} />
      }
      <AppRoutes />
      {canShow && !isChat
        &&
        <Footer />
      }
    </>
  )
}

export default App