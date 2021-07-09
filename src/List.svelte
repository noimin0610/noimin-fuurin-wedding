<script>
  import { Card, CardBody, CardText, CardFooter} from 'sveltestrap';
	import { database } from './firebase';

	// 更新があるたびに DB から画像の URL 一覧をひっぱってくる
	const databaseRef = database.ref('img')
	let imgList = []
	databaseRef.on('value', (snapshot) => {
		imgList = Object.values(snapshot.val())
	}, (errorObject) => {
		console.log(errorObject);
		imgList = []
	});
</script>

<main>
  <div class="row row-cols-1 row-cols-md-3 g-4">
  {#each imgList as {url, comment, name}}
    <div class="col">
      <Card>
        <img class="card-img-top" src={url} alt={comment}/>
        {#if comment || name}
        {#if comment}
          <CardBody>
            <CardText>{comment}</CardText>
          </CardBody>
        {/if}
        {#if name}
          <CardFooter>{name} さん</CardFooter>
        {/if}
        {/if}
      </Card>
    </div>
  {/each}
  </div>
</main>

<style>
</style>