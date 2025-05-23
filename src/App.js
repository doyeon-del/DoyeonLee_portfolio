import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;