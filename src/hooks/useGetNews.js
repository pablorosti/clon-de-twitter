import {useState, useEffect} from 'react';
import axios from 'axios';

export const useGetNews = () => {
    const [news, changeNews] = useState([]);

    useEffect(()=> {
      const url = `https://api.currentsapi.services/v1/latest-news?language=es&country=ar&categories=covid&apiKey=S5SObmNHP0WmR7_5UhyI45GQSEgFadd3JSFWjFW8PuG1dn75`
      axios.get(url)
      .then(res => {
        const news = res.data;
        changeNews(news)
      })
    }, [])

    return [news]
}