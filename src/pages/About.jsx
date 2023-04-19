import React from 'react'
import Layout from '../components/Layout/Layout';
import about_us from '../assets/about_us.png';

const About = () => {
  return (
    <Layout title={'about us shoppingDotCom'}>
      <div className='aboutImage'>
        <img src={about_us} alt="about us" />
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sint in exercitationem doloremque veritatis officia quod alias, ab, quibusdam labore corporis dolore autem esse nostrum repellendus eligendi cum adipisci. Quam.</p>
      </div>
    </Layout>
  )
}

export default About