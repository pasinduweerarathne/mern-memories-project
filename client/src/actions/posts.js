import {
  FETCH_ALL,
  FETCH_POSTS_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENTS,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostById(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    history.push("/");
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(comment, id);
    dispatch({ type: COMMENTS, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, history) => async (dispatch) => {
  try {
    await await api.deletePost(id);
    history.push("/");
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
