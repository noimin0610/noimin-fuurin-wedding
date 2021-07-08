<script>	
	import Router from 'svelte-spa-router'
	import Upload from './Upload.svelte'
	import Slideshow from './Slideshow.svelte'

	const routes = {
		"/": Upload
		,"/slideshow": Slideshow
		,"*": Upload
	}
</script>

<main>
	<Router routes={routes}></Router>
</main>