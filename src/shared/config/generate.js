module.exports = {
	templates: {
		ui: {
			template: 'src/shared/templates/comp',
			generate: 'src/shared/ui/',
		},
		slice: {
			template: 'src/shared/templates/slice',
			generate: 'src/*/',
		},
		page: {
			template: 'src/shared/templates/page',
			generate: 'src/pages/',
		},
		'page-ui': {
			template: 'src/shared/templates/comp',
			generate: 'src/pages/*/ui/',
		},
		wid: {
			template: 'src/shared/templates/widget',
			generate: 'src/widget/',
		},
		'wid-ui': {
			template: 'src/shared/templates/comp',
			generate: 'src/widget/*/ui/',
		},
		'wid-api': {
			template: 'src/shared/templates/api',
			generate: 'src/widget/*/api',
		},
		ent: {
			template: 'src/shared/templates/entities',
			generate: 'src/entities/',
		},
		'ent-ui': {
			template: 'src/shared/templates/comp',
			generate: 'src/entities/*/ui/',
		},
		'ent-api': {
			template: 'src/shared/templates/api',
			generate: 'src/entities/*/api',
		},
		'feat-api': {
			template: 'src/shared/templates/api',
			generate: 'src/features/*/api',
		},
		feat: {
			template: 'src/shared/templates/feature',
			generate: 'src/features/',
		},
		'feat-ui': {
			template: 'src/shared/templates/comp',
			generate: 'src/features/*/ui/',
		},
	},
	debug: true,
	isReplaceNameFolder: true,
}
