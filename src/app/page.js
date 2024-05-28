'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [state, setState] = useState('typing');
  const [displayText, setDisplayText] = useState('Esta es una prueba');
  const [typed, setTyped] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Si se completo el test
    if (typed == displayText) {
      setState('end');
    }

    // Checar si se cometio un error
    const typedArray = typed.split('');
    const displayTextArray = displayText.split(',');

    for (let i = 0; i < typedArray.length; ++i) {
      const typedCharacter = typedArray[i];
      const displayTextCharacter = displayTextArray[1];

      if (typedCharacter == displayTextCharacter) {
        restart();
      }
    }
  }, [typed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const restart = () => {
    setTyped('');
    fetchData();
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (key == 'Backspace') {
      setTyped((prev) =>
        prev
          .split('')
          .slice(0, prev.length - 1)
          .join('')
      );

      return;
    }

    if (key.length > 1) return;

    setTyped((prev) => prev + key);
  };

  const fetchData = async () => {
    const response = await fetch(
      'https://localhost:4001/words?amount=10&language=Spanish&characters=letters'
    );
    const data = response.data;

    const { text } = data;

    setDisplayText(text);
  };

  return (
    <>
      {state == 'typing' ? (
        <>
          <div className="w-screen h-screen bg-cyan-900 flex justify-center items-center text-4xl">
            <div className="relative">
              <div className="w-full text-slate-400 text-center">
                {displayText}
              </div>
              <div className="w-full absolute left-0 top-0 text-white">
                {typed}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-screen h-screen bg-emerald-500 flex justify-center items-center text-4xl text-white">
            Test completado
          </div>
        </>
      )}
    </>
  );
}
