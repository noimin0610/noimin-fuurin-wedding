<script>
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition'
	import { Image, Col, Container, Row, Card, CardFooter, CardBody, CardText } from 'sveltestrap';
	import { database } from './firebase';

	const SLIDESHOW_INTERVAL = 10000
	const databaseRef = database.ref('img')
	let imgList = []
	let imageUrl = null;
	let name = "";
	let comment = "";
	let intervalId;

	// 画像変えるとき用乱数
	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
	}
	// 10秒に1回画像を変える
	const changeImage = () => {
		const imgIdx = getRandomInt(0, imgList.length)
		imageUrl = imgList[imgIdx].url
		name = imgList[imgIdx].name;
		comment = imgList[imgIdx].comment;
	}

	onMount(() => {
		// 更新があるたびに DB から画像の URL 一覧をひっぱってくる
		databaseRef.on('value', (snapshot) => {
			imgList = Object.values(snapshot.val())
			changeImage()
			intervalId = setInterval(changeImage, SLIDESHOW_INTERVAL)
		}, (errorObject) => {
			console.log(errorObject);
			imgList = []
		});
	})

	onDestroy(() => {
		clearInterval(intervalId);
	})
</script>

<Container>
	<Row>
		<Col md="9" class="mb-4 text-center">
			<div class="image-box">
				<div class="mb-3">
					{#each Array(4) as i}
						<img class="frame" src="frame.png" alt="frame"/>
					{/each}
				</div>
				<Image fluid src={imageUrl} alt={comment} style="max-height: 500px;"/>
				<div class="mt-3">
					{#each Array(4) as i}
						<img class="frame" src="frame.png" alt="frame"/>
					{/each}
				</div>
			</div>
		</Col>
		<Col md="3">
			{#if comment || name}
				<Card class="mb-3 text-white bg-primary">
					{#if comment}
						<CardBody>
							<CardText>
								{comment}
							</CardText>
						</CardBody>
					{/if}
					{#if name}
						<CardFooter class="bg-primary">
							{name} さん
						</CardFooter>
					{/if}
				</Card>
				{/if}
		</Col>
	</Row>
</Container>

<style>
	.frame {
		width: 13vw;
		margin-right: 20px;
	}
</style>