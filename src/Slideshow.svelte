<script>
	import { onMount } from 'svelte';
	import firebase from "firebase/app";
	import "firebase/database";
	import "firebase/storage";

	const firebaseConfig = {
		apiKey: "AIzaSyDlp_ud7BFK9kKtMC0w_faVn6TyTVESyys",
		authDomain: "noimin-fuurin-wedding.firebaseapp.com",
		databaseURL: "https://noimin-fuurin-wedding-default-rtdb.firebaseio.com",
		projectId: "noimin-fuurin-wedding",
		storageBucket: "noimin-fuurin-wedding.appspot.com",
		messagingSenderId: "243666008631",
		appId: "1:243666008631:web:d0438bc4cf9904a0c75db2"
	}
    if (firebase.apps.length === 0) {
	    firebase.initializeApp(firebaseConfig)
    }

	const database = firebase.database()

	let imageFile = undefined

	const handleImageFile = (e) => {
		imageFile = e.target.files[0]
	}

	const zeroPadding = (num, length) => {
		return ("0".repeat(length) + String(num)).slice(-length)
	}

	// 更新があるたびに DB から画像の URL 一覧をひっぱってくる
	const databaseRef = database.ref('img')
	let imgList = []
	let imgIdx = 0
	databaseRef.on('value', (snapshot) => {
		imgList = Object.values(snapshot.val())
	}, (errorObject) => {
		console.log(errorObject);
		imgList = []
	});

	// 画像変えるとき用乱数
	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
	}
	// 10秒に1回画像を変える
	const changeImage = () => {
		imgIdx = getRandomInt(0, imgList.length)
	}
	let timerId = null
	const interval = 10000

	onMount(() => {
        changeImage()
        timerId = setInterval(changeImage, interval)
    })

</script>

<main>
{#if imgIdx < imgList.length}
    <div id=slideshow-img-container>
        <img id="slideshow-img" src={imgList[imgIdx].url} alt={imgList[imgIdx].comment}/>
    </div>
    <div id="slideshow-text-container">
        <p id="slideshow-text">{imgList[imgIdx].comment} (投稿者: {imgList[imgIdx].name} さん)</p>
    </div>
{/if}
</main>

<style>
	main {
		text-align: center;
	}

	#slideshow-img-container {
		width: 100vh;
		height: 90vh;
        margin: 0 auto;
        overflow: hidden;
	}

	#slideshow-img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
	}

    #slideshow-text-container {
        min-height: 50px;
    }
</style>