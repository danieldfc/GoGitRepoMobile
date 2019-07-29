import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    this.load();
  }

  load = async () => {
    const { navigation } = this.props;
    const { page, stars } = this.state;

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    return this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      refreshing: false,
    });
  };

  loadMore = async user => {
    const { page } = this.state;

    this.setState({ page: page + 1 });

    const response = await api.get(`/users/${user}/starred`, {
      params: {
        page,
      },
    });

    if (!(response.headers.link && response.headers.link.includes('next'))) {
      return new Error('Not permited the next page');
    }

    return this.setState({ stars: response.data });
  };

  handleRepository = repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={() => this.loadMore(user.login)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            data={stars}
            keyExtractor={start => String(start.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleRepository(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
