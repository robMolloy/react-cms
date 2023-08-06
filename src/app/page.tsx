"use client";
import { Cms, useStore } from "@/modules/react-cms";

export default function Home() {
  const store = useStore();
  return (
    <main className="flex min-h-screen p-24">
      <div>
        <div>asd</div>
        <div>asd</div>
        <Cms id="test-id">asd</Cms>
        <pre>{JSON.stringify(store.strings, undefined, 2)}</pre>
      </div>
    </main>
  );
}
