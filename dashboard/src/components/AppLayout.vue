<template>
	<div class="layout">
		<header>
			<slot name="header" />
		</header>
		<main>
			<slot />
		</main>
		<footer>
			<slot name="footer">made with slots</slot>
		</footer>
	</div>
</template>