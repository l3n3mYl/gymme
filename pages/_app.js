import '../styles/index.scss'
import { AuthProvider } from '../contexts/JWTVerification'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
