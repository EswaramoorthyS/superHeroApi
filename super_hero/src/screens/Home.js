import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import HeroList from './HerosList';
import Header from './Header';
import LoagingImg from './img/loading.gif'

class Home extends Component {
    state = {
        heroData: '',
        heroName: 'c',
        loader: false,
    }
    componentDidMount() {
        this.apiCall();
    }
    apiCall = async () => {
        this.setState({ loader: false })
        const accessToken = 1472477166435853
        const { heroName } = this.state;

        const url = `https://superheroapi.com/api.php/${accessToken}/search/${heroName}`;

        var response = await axios.get(url);

        if (response.status === 200) {
            var value = response.data;

            if (response.data.response !== "error") {
                this.setState({ heroData: value.results, loader: true })
            }
        }
    }
    searchName = (name) => {
        console.log(name, "nnnn")
        this.setState({ heroName: name },
            () => {
                this.apiCall();
            }
        )
    }
    render() {
        const { heroData, loader } = this.state;
        console.log(heroData, "hhhh")
        return (
            <>
                <div className='container'>
                    <Header />
                    <Search getQuery={(q) => this.searchName(q)} />

                    {loader === false ? <img
                        src={LoagingImg}
                        style={{ width: '200px', margin: 'auto', display: 'block' }}
                        alt='Loading'
                    />
                        :
                        <div>
                            {heroData.length > 0 &&
                                <section className='cards'>

                                    {heroData.map((e, i) => {
                                        return (
                                            <HeroList key={i} item={e}></HeroList>
                                        )
                                    })}
                                </section>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default Home;
