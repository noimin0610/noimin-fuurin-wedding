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

	const storageRef = firebase.storage().ref()
	const database = firebase.database()

	let imageFile = undefined

	const handleImageFile = (e) => {
		imageFile = e.target.files[0]
	}

	const zeroPadding = (num, length) => {
		return ("0".repeat(length) + String(num)).slice(-length)
	}

	const disableSubmitButton = () => {
		const submitButton = document.getElementById("submit")
		submitButton.disabled = true
		submitButton.innerHTML = "投稿中……"
	}

	const enableSubmitButton = () => {
		const submitButton = document.getElementById("submit")
		submitButton.disabled = false
		submitButton.innerHTML = "投稿する"
	}

	const submitImage = (e) => {
		if (!imageFile) {
			alert("画像ファイルを選択してください")
			return
		}

		// ファイル名を決める
		const date = new Date()
		const randomInt = Math.floor(Math.random() * 100000)
		const fileName = `${date.getFullYear()}${zeroPadding(date.getMonth() + 1, 2)}${zeroPadding(date.getDate() + 1, 2)}${zeroPadding(date.getHours() + 1, 2)}${zeroPadding(date.getMinutes() + 1, 2)}${zeroPadding(date.getSeconds() + 1, 2)}_${randomInt}`
		const ext = imageFile.name.split(".").slice(-1)[0]

		const imageRef = storageRef.child(`img/${fileName}.${ext}`)
		disableSubmitButton()
		imageRef.put(imageFile).then((snapshot) => {
			snapshot.ref.getDownloadURL().then((url) => {
				database.ref(`img/${fileName}`).set({
					url: url
					,name: document.getElementById("name").value
					,comment: document.getElementById("comment").value
				})
				enableSubmitButton()
				alert("画像のアップロードが完了しました！")
			})
		})
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
	<h2>画像を投稿する</h2>
	<form method="post" onsubmit="return false" enctype="multipart/form-data">
		<label>
			画像ファイル (必須): <br>
			<input id="image-file" type="file" name="img" accept="image/*" on:change={handleImageFile} required>
		</label>
		<label>
			投稿者名 (空欄可　20文字以内):  <br>
			<input id="name" type="text" name="name" maxlength="20" size="20">
		</label>
		<label>
			一言コメント (空欄可　200文字以内):  <br>
			<textarea id="comment" name="comment" maxlength="200" rows="5" cols="40"></textarea>
		</label>
		<button id="submit" on:click={submitImage}>投稿する</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>