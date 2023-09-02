import React, { useState, Dispatch, SetStateAction, useRef } from "react";

type TUseVueRef = <T>(p: T) => {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};
const useVueRef: TUseVueRef = (p) => {
  const [value, setValue] = useState(p);
  return { value, setValue };
};

const Page: React.FC = () => {
  const str = useVueRef("a");
  const num = useVueRef(1);
  const obj = useVueRef({ a: "a", b: 1 } as { [key: string]: string | number });

  const numRef = useRef(0);
  return (
    <main className="flex min-h-screen p-24">
      <button onClick={() => str.setValue("p")}>p</button>
      <button onClick={() => str.setValue("s")}>s</button>
      <pre>{JSON.stringify(str.value, undefined, 2)}</pre>

      <button onClick={() => num.setValue(2)}>2</button>
      <button onClick={() => num.setValue(3)}>3</button>
      <button onClick={() => num.setValue((x) => (x -= 1))}>--</button>
      <button onClick={() => num.setValue((x) => (x += 1))}>++</button>
      <pre>{JSON.stringify(num.value, undefined, 2)}</pre>

      <button onClick={() => obj.setValue({ a: "p", b: 2 })}>p,3</button>
      <button onClick={() => obj.setValue({ a: "s", b: 3 })}>s,3</button>
      <button onClick={() => obj.setValue({ a: 2, b: "a" })}>2,a</button>
      <pre>{JSON.stringify(obj.value, undefined, 2)}</pre>

      <button onClick={() => (numRef.current = 1)}>1</button>
      <button onClick={() => numRef.current--}>--</button>
      <button onClick={() => numRef.current++}>++</button>
      <pre>{JSON.stringify(numRef.current, undefined, 2)}</pre>
    </main>
  );
};

export default Page;
