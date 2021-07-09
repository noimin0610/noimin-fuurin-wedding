<script>	
	import Router from 'svelte-spa-router'
	import Upload from './Upload.svelte'
	import Slideshow from './Slideshow.svelte'
	import List from './List.svelte'

	import NavBar from './NavBar.svelte'
	import { Container } from 'sveltestrap'

	const routes = {
		"/": Upload
		,"/slideshow": Slideshow
		,"/photos": List
		,"*": Upload
	}
</script>

<NavBar />
<Container class="mt-4 mb-5">
	<Router routes={routes}></Router>
</Container>
