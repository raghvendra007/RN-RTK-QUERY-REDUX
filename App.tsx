/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useGetPostsQuery, useNewPostMutation} from './redux/api';
// import {addItem} from './redux/cartSlice';
interface Post {
  title: string;
  body: String;
  id: Number;
}

export const PostCard = ({post}: {post: Post}) => {
  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: '700'}}>{post.body}</Text>
      <Text>{post.title}</Text>
    </View>
  );
};

function App(): JSX.Element {
  const dispatch = useDispatch();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  // const item = useSelector(store => store?.cart?.item);
  const {isLoading, isFetching, isSuccess, isError, data} =
    useGetPostsQuery('');

  const [newPostAdd] = useNewPostMutation();

  console.log(data);

  const AddItem = () => {
    console.log('addd item>>>>');
    const body = inputRef1?.current?.value;
    const title = inputRef2?.current?.value;

    console.log('body text', body);
    console.log('title text', title);

    const post: Post = {
      body,
      title,
      id: Math.random() * 100,
    };
    newPostAdd(post);

    inputRef1?.current?.clear();
    inputRef2?.current?.clear();

    // dispatch(addItem('pizza'));
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{margin: 20}}>CART</Text>

        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          placeholder="Title"
          ref={inputRef2}
          onChangeText={text => {
            inputRef2.current.value = text;
          }}
        />

        <TextInput
          ref={inputRef1}
          onChangeText={text => {
            inputRef1.current.value = text;
          }}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          placeholder="body"
        />

        <TouchableOpacity>
          <Button onPress={AddItem} title="Add" />
        </TouchableOpacity>

        {isLoading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          data?.map(i => <PostCard key={i.id} post={i} />)
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
