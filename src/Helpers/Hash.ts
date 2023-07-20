import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const iv = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3"

const encryptionIV = crypto
  .createHash('sha512')
  .update(iv)
  .digest('hex')
  .substring(0, 16)


export const encrypt = (date: string | null = null) => {
  if (!date) {
    const newDate = new Date()
    newDate.setDate(newDate.getDay() + 2)
    date = newDate.toISOString()
  }

  const cipher = crypto.createCipheriv(algorithm, secretKey, encryptionIV)
  const encrypted = Buffer.concat([cipher.update(date), cipher.final()])
  return encrypted.toString('hex')
}

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, encryptionIV)
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()])
  return decrpyted.toString()
}