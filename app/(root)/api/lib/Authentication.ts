import crypto from 'crypto'

const SECRET: string = process.env.AUTH_SECRET!

/**
 * Generate a random 128-bytes string in base-64 encoding.
 */
export const random = () => {
	return crypto.randomBytes(128).toString('base64')
}

/**
 * Generate a hash code with salt and data
 * @param salt (recommend to be generated by `random()`)
 * @param data the data needs to be hash, such as a password string
 */
export const hashCode = (salt: string, data: string) => {
	const hmac = crypto
		.createHmac('sha256', [salt, data].join('/'))
		.update(SECRET)
	return hmac.digest().toString('hex')
}