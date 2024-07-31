// src/routes/jobRouter.ts
import express from 'express';
import { createJob, getJobs, getJobById } from '../controllers/jobController';
import { rateLimiter } from '../middlewares/rateLimit';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management and processing
 */

/**
 * @swagger
 * /api/v1/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The job ID
 *                   example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *       500:
 *         description: Internal Server Error
 */
router.post('/jobs', rateLimiter, createJob);

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The job ID
 *                     example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *                   status:
 *                     type: string
 *                     description: The job status
 *                     example: pending
 *                   result:
 *                     type: string
 *                     description: The job result (if resolved)
 *                     example: http://image.url
 *       500:
 *         description: Internal Server Error
 */
router.get('/jobs', getJobs);

/**
 * @swagger
 * /api/v1/jobs/{jobId}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The job ID
 *                   example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *                 status:
 *                   type: string
 *                   description: The job status
 *                   example: resolved
 *                 result:
 *                   type: string
 *                   description: The job result
 *                   example: http://image.url
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/jobs/:jobId', getJobById);

export default router;
