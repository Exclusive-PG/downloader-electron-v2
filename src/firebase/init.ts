// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLBCdVHHJIIYJtXwauCYsTR69Fo5Axpuw",
  authDomain: "exclusive-ytdownloader.firebaseapp.com",
  projectId: "exclusive-ytdownloader",
  storageBucket: "exclusive-ytdownloader.appspot.com",
  messagingSenderId: "951901185903",
  appId: "1:951901185903:web:7c401758511b841044aa9a",
  measurementId: "G-4BHPJMDYY1"
};

// Initialize Firebase
let app ;


if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  }

//const analytics = getAnalytics(app);

export async function get( collection: string, firebase:any) {
	let docs:any = [];

	const querySnapshot = await firebase.firestore().collection(collection).get();

	querySnapshot.forEach(function (doc:any) {
		docs.push({
			data: doc.data(),
		});
	});
	return docs;
}

const getData = async(app:any) =>{

let appConfig = await get("app", app).then((data)=>{console.log(data)});
console.log(appConfig)

}

getData(app)