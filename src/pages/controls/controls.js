import React, { Component, Fragment, Suspense, lazy } from 'react';
import Spinner from 'react-spinkit';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import style from './controls.module.css';
import Counter from '../../components/counter/counter';
import data from '../../db/publications.json';
import ControlButtons from '../../components/buttons/buttons';

const TextPage = lazy(() => import('../textPage/textPage'));

class Controls extends Component {
  state = {
    value: 0,
    article: '',
  };

  onHandleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
    }));
  };

  onHandleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
    }));
  };

  componentDidMount = () => {
    /* eslint-disable-next-line */
    const { item } = queryString.parse(this.props.location.search);
    if (Number(item) && Number(item) > 0 && Number(item) < data.length) {
      this.setState({
        value: Number(item),
      });
    } else {
      /* eslint-disable-next-line */
      this.props.history.replace({
        pathname: '/reader',
        search: `?item=1`,
      });
      this.setState({
        value: 1,
      });
    }
    const id = this.state.value;
    this.setState({ article: data[id] });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.value !== this.state.value) {
      const id = this.state.value - 1;
      this.setState({ article: data[id] });
    }
  };

  render() {
    const { value, article } = this.state;
    return (
      <Fragment>
        <Suspense
          fallback={
            <div className={style.spinner}>
              <Spinner name="circle" />
            </div>
          }
        >
          <TextPage {...article} />
        </Suspense>
        <Counter value={value} length={data.length} />
        <ControlButtons
          value={value}
          length={data.length}
          onHandleDecrement={this.onHandleDecrement}
          onHandleIncrement={this.onHandleIncrement}
        />
      </Fragment>
    );
  }
}

export default withRouter(Controls);
