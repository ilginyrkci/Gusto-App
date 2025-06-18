/**
 * @copyright Gusto Damak Tadı 2025
 * @license Apache-2.0
 */
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { BrowserRouter } from "react-router-dom"; 
gsap.registerPlugin(useGSAP, ScrollTrigger);

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ChefTeam from "./components/ChefTeam";
import Cake from "./components/Cake";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up');
    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-200 bottom',
          end: 'bottom 80%',
          scrub: true
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      })
    });
  });

  return (
   <BrowserRouter>
  <ReactLenis root>
    <Header />
    <main>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="kadromuz"><ChefTeam /></section>
      <section id="cakes"><Cake /></section>
      <section id="contact"><Contact /></section>
    </main>
    <Footer />
  </ReactLenis>
</BrowserRouter>
  );
}

export default App;