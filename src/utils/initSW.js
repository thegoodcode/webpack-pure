export const initServiceWorker = () => {
	if (!navigator.serviceWorker) return
	navigator.serviceWorker
		.register('./sw.js')
		.then(() => {
			console.log('sw registered successfully!')
		})
		.catch(error => {
			console.log('Some error while registering sw:', error)
		})
}
