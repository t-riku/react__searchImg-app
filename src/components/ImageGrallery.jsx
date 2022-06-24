import React from "react";
import "../ImageGrallery.css";

const ImageGrallery = ({ fetchData }) => {
  return (
    <div>
      <div className="images-wrapper">
        {/* map関数が使えるのは配列の時だけ。オブジェクトには使えない。 */}
        {fetchData.map((data) => (
          <div className="image" key={data.id}>
            {/* クリックしたらpixabayのそれぞれの画像のurlに飛ぶ */}
            <a href={data.pageURL} target="_blank">
              <img src={data.largeImageURL} alt=" " />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrallery;
