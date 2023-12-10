

import React from 'react';
import style from '../Paginado/Paginado.module.css';


const Paginado = ({ paginado, driversPerPage, allDrivers, currentPage }) => {
  const totalPages = Math.ceil(allDrivers / driversPerPage);
  const pageRange = 7;

  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  let endPage = startPage + pageRange - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageRange + 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage +1 }, (_, i) => startPage + i);

  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        {currentPage > 1 && (
          <li className={style.number} key="previous">
            <button onClick={() => paginado(currentPage - 1)}>Previous</button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? style.active : style.number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className={style.number} key="next">
            <button onClick={() => paginado(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginado;

// const Paginado = ({ paginado, driversPerPage, allDrivers, currentPage }) => {
//   const totalPages = Math.ceil(allDrivers / driversPerPage);
//   const pageRange = 5; // Puedes ajustar el rango según tus preferencias

//   // Calcula el rango de páginas a mostrar
//   let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
//   let endPage = startPage + pageRange - 1;

//   if (endPage > totalPages) {
//     endPage = totalPages;
//     startPage = Math.max(1, endPage - pageRange + 1);
//   }

//   const pageNumbers = [];
//   for (let i = startPage; i <= endPage; i++) {
//     pageNumbers.push(i);
//   }

//   return (
    
//       <nav className={style.nav}>
//         <ul className={style.ul}>
//           {currentPage > 1 && (
//             <li className={style.number} key="previous">
//               <a onClick={() => paginado(currentPage - 1)}>Previous</a>
//             </li>
//           )}
//           {pageNumbers.map((number) => (
//             <li key={number} className={number}>
//               <a onClick={() => paginado(number)}>{number}</a>
//             </li>
//           ))}
//           {currentPage < totalPages && (
//             <li className={style.number} key="next">
//               <a onClick={() => paginado(currentPage + 1)}>Next</a>
//             </li>
//           )}
//         </ul>
//       </nav>
    
//   );
// };

// export default Paginado;