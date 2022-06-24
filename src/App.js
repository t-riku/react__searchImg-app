import React, { useState, useRef } from "react";
import ImageGrallery from "./components/ImageGrallery";

function App() {
  // useStateは変数が動的に変化する時に使用する
  // 今回であればfetchDataが変わるたびにそこだけレンダリング(再描画)される
  const [fetchData, setFetchData] = useState([]);
  // useRefを利用するとfetchDataのstate更新時にのみコンポーネントの再レンダリングが発生する。
  const ref = useRef();

  // リロードさせないようにするため。リロードしてしまうとinputの値が取れなくなってしまう。
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ref.current.value);

    // APIURL
    // このref.current.valueがinput属性に入力された値が入っている。バックコーテンションの中で変数を使うときは${}で囲む。
    const endpointURL = `https://pixabay.com/api/?key=28225428-793640b5319fdfe288e4a9d6f&q=${ref.current.value}&image_type=photo`;
    // APIを叩く(データフェッチング)
    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // data.hitsにする。map関数はオブジェクトで使えないため。配列にする。
        console.log(data.hits);
        setFetchData(data.hits);
      });
  };

  return (
    <div className="w-screen h-screen py-9 flex flex-col items-center">
      <h2 className="mb-6 font-bold text-4xl">My Pixabay</h2>
      {/* enterを押した時にhandleSumbit関数が引数eで走る */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="画像を探す"
          // ref=useRef()でinput属性で入力された値を受け取ることができる
          ref={ref}
          className="py-1 px-3 mb-9 border border-black rounded-sm min-w-[340px]"
        />
      </form>
      {/* propsの受け渡し */}
      <ImageGrallery fetchData={fetchData} />
    </div>
  );
}

export default App;
