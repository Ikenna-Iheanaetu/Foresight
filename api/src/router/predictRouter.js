import express from 'express'
import { generalIllnessPredict } from '../controller/predictController.js'

const predictRouter = express.Router()

predictRouter.post('/predict/general', generalIllnessPredict)

export default predictRouter

