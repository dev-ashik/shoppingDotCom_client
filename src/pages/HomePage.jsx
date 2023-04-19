import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  console.log(auth)
  return (
    <Layout title={'best offers'}>
        <div>HomePage</div>
        <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  )
}

export default HomePage