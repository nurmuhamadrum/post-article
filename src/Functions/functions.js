import axios from 'axios';

const BASE_URL = 'https://dummyapi.io/data/v1';
const APP_ID = '63639cafcd846c72c251bb4d'

export const getArticleList = async (page = 1) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${BASE_URL}/post?limit=5&page=${page}`;
			const response = await axios.get(url, { headers: { 'app-id': APP_ID } })

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
			const response = await axios.get(url, { headers: { 'app-id': APP_ID } })

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
			const headers_ = { headers: { 'app-id': APP_ID }};
			// let bodyFormData = new FormData();

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