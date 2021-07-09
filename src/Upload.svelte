<script>
	import { Image, FormGroup, Label, Input, Button } from 'sveltestrap';
	import { fade } from 'svelte/transition'
	import { storageRef, database } from './firebase';

	let imageFile = undefined
	let imageData = null;

	const handleImageFile = (e) => {
		imageFile = e.target.files[0]
		var fileReader = new FileReader();
		fileReader.onload = () => imageData = fileReader.result;
		fileReader.readAsDataURL(imageFile);
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
</script>

<main class="conatiner honokamin text-dark">
	<h2 class="honokamin text-dark mb-3">画像を投稿する</h2>
	<form method="post" onsubmit="return false" enctype="multipart/form-data">
		<FormGroup>
			<Label>画像ファイル(必須)</Label>
			<Input id="image-file" type="file" name="img" accept="image/*" on:change={handleImageFile} required />
			{#if imageData}
				<div transition:fade>
					<Image fluid src={imageData} alt="image" class="my-2" />
				</div>
			{/if}
		</FormGroup>
		<FormGroup>
			<Label>投稿者名 (空欄可　20文字以内)</Label>
			<Input id="name" type="text" name="name" maxlength="20" size="20"/>
		</FormGroup>
		<FormGroup>
			<Label>一言コメント (空欄可　200文字以内)</Label>
			<Input id="comment" type="textarea" name="comment" maxlength="200" rows="5" cols="40"/>
		</FormGroup>
		<Button id="submit" class="honokamin" on:click={submitImage}>投稿する</Button>
	</form>
</main>
