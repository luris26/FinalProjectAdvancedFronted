import React, { useState } from 'react';

const ClipboardExample: React.FC = () => {
  const [text, setText] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Texto copiado al portapapeles');
    } catch (err) {
      alert('Error al copiar el texto');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
        {/* extra credit */}
      <h1 className="text-xl font-bold mb-4">Clipboard API Example</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Escribe algo para copiar..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleCopy}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Copiar al portapapeles
      </button>
    </div>
  );
};

export default ClipboardExample;
