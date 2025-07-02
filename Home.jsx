import { useState } from 'react'
import "../App.css"
import GooeyNav from '../components/GooeyNav'
import Herosection from '../components/Herosection';
import Card from '../components/Card';  
import Footer from '../components/Footer';








function Home() {
  const items = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Shop", href: "#" },
  ];

  
  return (
    <>


    {/* <div className="nav-wrapper">
    <GooeyNav
    items={items}
    animationTime={600}
    pCount={15}
    minDistance={20}
    maxDistance={42}
    maxRotate={75}
    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    timeVariance={300}
  />

    </div> */}


    <Herosection
      color={[0.3, 0.9, 1]}
      mouseReact={false}
      amplitude={0.1}
      speed={1.0}
    />

  <div className='our_products'>
    <h1>OUR PRODUCTS</h1>
 

  <div className='card-wrapper'>
       <Card
        image="https://i.pinimg.com/736x/8d/93/d6/8d93d6e7ce8a1abcf21149bc6b97f9c8.jpg"
        title="Customised T-shirts"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/3d/0d/2e/3d0d2e5f580a2281bddc41533cd2acfc.jpg"
        title="Customised Mugs"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/76/24/af/7624af65d6ec0d3c11beaa7c84f6057f.jpg"
        title="Customised Keychains"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/13/0e/d6/130ed67683d0ed5e70e1be04e2355f49.jpg"
        title="Customised Photoframes"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/bd/3c/7b/bd3c7ba0beb436aa0ab81e9ff7661276.jpg"
        title="Customised Totebags"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/3e/bb/51/3ebb513183bf7fa98da81e9f3dfe1bd7.jpg"
        title="Customised Jerseys"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/c9/af/e5/c9afe5c860ace699f6e690c5e4f741eb.jpg"
        title="Customised Phonecase"
        details={{ id: "Shop now", value: "Exclusive" }}      />
      <Card
        image="https://i.pinimg.com/736x/e0/cc/a1/e0cca1c8502c99504430a93bab3b64cd.jpg"
        title="Customised Caps"
        details={{ id: "Shop now", value: "Exclusive" }}
      />
  
  </div>
  </div>
 <Footer/>


    </>
  )
}

export default Home
