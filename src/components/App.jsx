import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { URL, KEY } from 'utilities/constans';
import { MyContext } from 'hooks/useDataContext';
export const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [LoaderVisible, setLoaderVisible] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (query === '') {
      return;
    }
    setLoaderVisible(true);
    setButtonStatus(false);
    axios
      .get(
        `${URL}key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
        {
          signal: controller.signal,
        }
      )
      .then(res => {
        if (res.data.hits.length === 0) {
          return;
        }

        setData(prevState => [...prevState, ...res.data.hits]);
      })
      .finally(() => {
        setLoaderVisible(false);
        setButtonStatus(true);
      });
    return () => {
      controller.abort();
    };
  }, [page, query]);

  const getQueryandResetPageAndData = query => {
    setData([]);
    setPage(1);
    setQuery(query);
  };

  const increasePageNumber = () => setPage(prevState => prevState + 1);

  return (
    <>
      <MyContext.Provider value={data}>
        <AppWrapper>
          <Searchbar
            getQueryandResetPageAndData={getQueryandResetPageAndData}
            page={page}
          />
          <ImageGallery data={data} query={query} />

          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              margin: `0 auto`,
            }}
            visible={LoaderVisible}
          />
          <Button
            onLoadMore={() => increasePageNumber()}
            showed={buttonStatus}
          />
        </AppWrapper>
      </MyContext.Provider>
    </>
  );
};

// export class App extends Component {
//   state = {
//     data: [],
//     query: '',
//     page: 1,
//     LoaderVisible: false,
//     buttonStatus: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.query !== this.state.query
//     ) {
//       this.setState({
//         LoaderVisible: true,
//       });
//       axios
//         .get(
//           `${URL}key=${KEY}&q=${this.state.query}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
//         )
//         .then(res => {
//           if (res.data.hits.length === 0) {
//             return;
//           }
//           this.setState(prevState => {
//             return {
//               data: [...prevState.data, ...res.data.hits],
//             };
//           });
//         })
//         .finally(() =>
//           this.setState({
//             LoaderVisible: false,
//             buttonStatus: true,
//           })
//         );
//     }
//   }

//   getQueryandResetPageAndData = query => {
//     this.setState({
//       query,
//       page: 1,
//       data: [],
//     });
//   };

//   increasePageNumber = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };
//   render() {
//     const { page, data } = this.state;
//     return (
//       <AppWrapper>
//         <Searchbar
//           getQueryandResetPageAndData={this.getQueryandResetPageAndData}
//           page={page}
//         />
//         <ImageGallery data={data} />

//         <ThreeDots
//           height="80"
//           width="80"
//           radius="9"
//           color="#4fa94d"
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{
//             margin: `0 auto`,
//           }}
//           visible={this.state.LoaderVisible}
//         />
//         <Button
//           onLoadMore={() => this.increasePageNumber()}
//           showed={this.state.buttonStatus}
//         />
//       </AppWrapper>
//     );
//   }
// }
