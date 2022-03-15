const { stdin: input } = require('process')

input.resume()

input.on('data', (data) => {
	const srtingData = data.toString('utf-8')
	const dataArray = srtingData.split(/\n/)
	const Ksa = KSA(dataArray[0])
	RPGA(dataArray[1], Ksa)
})

const keylength = (key) => {
	return Buffer.from(key).length
}

const swap = (array, i, j) => {
	const aux = array[i]
	array[i] = array[j]
	array[j] = aux

	return array
}

const KSA = (key) => {
	let S = Array.from(Array(256).keys())

	let j = 0

	for (i in S) {
		j = (j + S[i] + key.charCodeAt(i % keylength(key))) % 256
		S = swap(S, i, j)
	}

	return S
}

const RPGA = (message, S) => {
	let i = 0
	let j = 0
	const result = []

	for (l in message) {
		i = (i + 1) % 256
		j = (j + S[i]) % 256
		S = swap(S, i, j)
		const K = S[(S[i] + S[j]) % 256]
		const hex = (K ^ message.charCodeAt(l)).toString(16)
		result.push(hex.length < 2 ? '0' + hex : hex)
	}

	console.log(result.join('').toUpperCase())
}
