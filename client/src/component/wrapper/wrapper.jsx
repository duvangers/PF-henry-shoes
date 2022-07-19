import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

export function Wrapper() {
  return (
    <div>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src="modified.jpeg" srcSet="modified.jpeg" alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src="normal.jpeg" srcSet="normal.jpeg" alt="Image two" />}
      />
      <h1>Ponele color a tu estilo</h1>
    </div>
  )
}

// <!DOCTYPE html>
// <html lang="en" dir="ltr">
//   <head>
//     <meta charset="utf-8">
//     <title>Image Comparison Slider</title>
//     <link rel="stylesheet" href="style.css">
//   </head>
//   <body>
//     <div class="wrapper">
//       <div class="images">
//         <div class="img-1"></div>
//         <div class="img-2"></div>
//       </div>
//       <div class="slider">
//         <div class="drag-line">
//           <span></span>
//         </div>
//         <input type="range" min="0" max="100" value="50">
//       </div>
//     </div>

//     <script>
//       const slider = document.querySelector(".slider input");
//       const img = document.querySelector(".images .img-2");
//       const dragLine = document.querySelector(".slider .drag-line");
//       slider.oninput = ()=>{
//         let sliderVal = slider.value;
//         dragLine.style.left = sliderVal + "%";
//         img.style.width = sliderVal + "%";
//       }
//     </script>

//   </body>
// </html>
