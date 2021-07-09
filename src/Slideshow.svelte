<script>
	import { onMount } from 'svelte';
	import { database } from './firebase';

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