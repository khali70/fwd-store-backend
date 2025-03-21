import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
export const token = async (
  req: Request<Record<string, unknown>, Record<string, never>>,
  res: Response,
  next: () => void
) => {
  try {
    if (!process.env.TOKEN_SECRET) {
      console.error(`can't get token secret from environmental variable`)
    }
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) throw Error('token required')
    const secret = jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (error) {
    res.status(403)
    res.contentType('application/json')
    res.send({ error: 'invalid token JWT must be provided' })
  }
}
export const getHash = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.SALT_ROUNDS as string)
    )
    const paper = process.env.BCRYPT_PASSWORD
    const hash = await bcrypt.hash(password + paper, salt)
    return hash
  } catch (error) {
    throw Error(`can't hash password error ${error}`)
  }
}
export const compareHash = (
  password: string,
  encryptedPassword: string
): boolean => {
  const paper = process.env.BCRYPT_PASSWORD
  const samePass = bcrypt.compareSync(password + paper, encryptedPassword)
  return samePass
}

export const testingToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWhtZWQiLCJsYXN0bmFtZSI6bnVsbCwicGFzc3dvcmQiOiIkMmIkMTAkZ0JJd29jbnRSME9IZGRCekhtaUFQZS90THpsR3dVemlwRWJ5dFpuZzNqbWFBbndQaUtCU3EiLCJpYXQiOjE2NDE0OTM2NjJ9.8uAdKcG-r57o5r8Zvnc7Xx-xYRhu7XDZ-MDAlxPM44s`
