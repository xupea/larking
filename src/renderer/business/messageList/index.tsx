// import { List, ListRowRenderer } from 'react-virtualized';
// import React, { useState, useRef } from 'react';

// const generateData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const data = [];

//       for (let i = 0; i < 10; i++) {
//         data.push({
//           id: i,
//           name: `Item ${i}`,
//         });
//       }

//       resolve(data);
//     }, 1000);
//   });
// };

// // fetch sample data
// const fetchMoreData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(generateData());
//     }, 1000);
//   });
// };

// // render row
// const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
//   return (
//     <div key={key} style={style}>
//       {data[index]}
//     </div>
//   );
// };

// function UpwardsLoadingList() {
//   const listRef = useRef();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadMoreData = async () => {
//     setLoading(true);
//     const newData = await fetchMoreData();
//     setData((prevData) => [...prevData, ...newData]);
//     setLoading(false);
//   };

//   const onScroll = ({ scrollTop }) => {
//     if (scrollTop < 1 && !loading && canLoadMore()) {
//       loadMoreData();
//     }
//   };

//   return (
//     <List
//       ref={listRef}
//       height={400}
//       rowHeight={30}
//       rowCount={data.length}
//       onScroll={onScroll}
//     >
//       {rowRenderer}
//     </List>
//   );
// }

// export default UpwardsLoadingList;
