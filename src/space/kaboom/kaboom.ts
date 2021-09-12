// NOTE: using parcel here; had to set an alias
import kaboom from 'kaboom'

export const k = kaboom({
	width: 640,
	height: 480,
	scale: 1,
	clearColor: [0, 0, 0, 1],
	root: document.getElementById('kaboom') ?? undefined	
})

export default k