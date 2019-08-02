<template>
	<v-container fluid>
		<app-card :fullBlock="true">
			<div class="breadcrumbs-box">
			<h2 class="text-capitalize mb-0">{{$t(pageTitle)}}</h2>
			<div class="spacer"></div>
			{{pageBreadcrumb}}
			</div>
		</app-card>
	</v-container>
</template>

<script>
export default {
  computed: {
    // computed property to get page breadcrumbs
    pageTitle() {
      return this.$breadcrumbs[0].meta.title;
    },
    pageBreadcrumb() {
      return this.$breadcrumbs[0].meta.breadcrumb;
    }
  }
};
</script>
