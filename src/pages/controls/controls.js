import React, { Component, Fragment, Suspense, lazy } from 'react';
import Spinner from 'react-spinkit';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import style from './controls.module.css';
import Counter from '../../components/counter/counter';
import data from '../../db/publications.json';
import ControlButtons from '../../components/buttons/buttons';
import slideTransitionLeft from './slideLeft.module.css';
import slideTransitionRight from './slideRight.module.css';

const TextPage = lazy(() => import('../textPage/textPage'));
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100',
    height: 'auto',
    position: 'relative',
  },
};

class Controls extends Component {
  state = {
    value: 0,
    articles: data,
    currentArticle: data[0],
  };

  onHandleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
      direction: true,
    }));
  };

  onHandleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
      direction: false,
    }));
  };

  componentDidMount = () => {
    /* eslint-disable-next-line */
    const { item } = queryString.parse(this.props.location.search);
    if (Number(item) && Number(item) > 0 && Number(item) < data.length) {
      this.setState(prevState => ({
        value: Number(item),
        currentArticle: prevState.articles[Number(item) - 1],
      }));
    } else {
      /* eslint-disable-next-line */
      this.props.history.replace({
        pathname: '/reader',
        search: `?item=1`,
      });
      this.setState(prevState => ({
        value: 1,
        currentArticle: prevState.articles[0],
      }));
    }
    const id = this.state.value;
    this.setState({ currentArticle: data[id - 1] });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.value !== this.state.value) {
      const id = this.state.value - 1;
      this.setState({ currentArticle: data[id] });
    }
  };

  render() {
    const { value, currentArticle, direction } = this.state;
    return (
      <Fragment>
        <Suspense
          fallback={
            <div className={style.spinner}>
              <Spinner name="circle" />
            </div>
          }
        >
          <TransitionGroup style={styles.container}>
            <CSSTransition
              in
              appear={false}
              key={value}
              timeout={600}
              classNames={
                direction ? slideTransitionLeft : slideTransitionRight
              }
            >
              <TextPage {...currentArticle} />
            </CSSTransition>
          </TransitionGroup>
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
