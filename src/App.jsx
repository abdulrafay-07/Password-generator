import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 40);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md shadow-md rounded-lg px-6 py-2 my-12 text-orange-500 bg-gray-700 text-center">

        <h1 className="text-white text-center mb-3 text-xl">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly ref={passwordRef} />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={40} value={length} id="rangeScroll" className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}} />
            <label htmlFor="rangeScroll">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numAllowed} id="numberInput"
            onChange={() => {
              setNumAllowed(!numAllowed)
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id="charInput"
            onChange={() => {
              setCharAllowed(!charAllowed)
            }} />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>

      </div>
    </div>
  )
}

export default App
