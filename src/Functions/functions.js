import { useState, useLayoutEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://dummyapi.io/data/v1';
const APP_ID = '63639cafcd846c72c251bb4d';
const headers_ = { headers: { 'app-id': APP_ID } };

export const getArticleList = async (page = 1) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${BASE_URL}/post?limit=5&page=${page}`;
			const response = await axios.get(url, headers_)

			resolve(response?.data)
		} catch (error) {
			resolve(false)
			console.log('error@function.getArticle', error);
		}
	})
}

export const getUser = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${BASE_URL}/user?limit=5`;
			const response = await axios.get(url, headers_)

			resolve(response?.data?.data)
		} catch (error) {
			resolve(false)
			console.log('error@function.getUser', error);
		}
	})
}

export const createArticle = async (content, tags) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${BASE_URL}/post/create`;

			let body = {
				"image": "https://alxgroup.com.au/wp-content/uploads/2016/04/dummy-post-horisontal.jpg",
				"likes": 0,
				"link": "https://www.instagram.com/teddyosterblomphoto/",
				"tags": tags,
				"text": content,
				"owner": "63652b643eb3e26fc0faf02b"
			}

			const response = await axios.post(url, body, headers_)
			resolve(response)
		} catch (error) {
			resolve(false)
			console.log('error@function.createArticle', error);
		}
	})
}

export const deleteArticle = async (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${BASE_URL}/post/${id}`;

			const response = await axios.delete(url, headers_)
			resolve(response)
		} catch (error) {
			console.log('error@deleteArticle', error);
		}
	})
}

export const editArticle = async (content, tags, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${BASE_URL}/post/${id}`;

			let body = {
				"tags": tags,
				"text": content,
				"owner": "63652b643eb3e26fc0faf02b"
			}

			const response = await axios.put(url, body, headers_)
			resolve(response)
		} catch (error) {
			resolve(false)
			console.log('error@function.editArticle', error);
		}
	})
}

export const useWindowSize = () => {
	const [size, setSize] = useState([0, 0]);

	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener('resize', updateSize);

		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return size[0] <= 768;
}