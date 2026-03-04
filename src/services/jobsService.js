import { getCareerPaths, saveCareerPath, deleteCareerPath as storageDelete } from '../utils/storage';

/**
 * Service to handle job/career related API operations.
 * Currently mocks a real backend using localStorage via storage.js.
 */
export const jobsService = {
    /**
     * Fetches all jobs.
     * @returns {Promise<Array>}
     */
    async fetchJobs() {
        // Simulating network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = getCareerPaths();
                resolve(data);
            }, 500);
        });
    },

    /**
     * Adds a new job to the system.
     * @param {Object} jobData 
     * @returns {Promise<Object>}
     */
    async addJob(jobData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newJob = {
                    ...jobData,
                    id: jobData.id || `job_${Date.now()}`,
                    level: jobData.level || 'Junior', // Default level
                    skills: jobData.skills || []
                };
                saveCareerPath(newJob);
                resolve(newJob);
            }, 300);
        });
    },

    /**
     * Deletes a job by ID.
     * @param {string|number} id 
     * @returns {Promise<boolean>}
     */
    async deleteJob(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                storageDelete(id);
                resolve(true);
            }, 300);
        });
    },

    /**
     * Dynamically extracts unique industries/categories from a list of jobs.
     * @param {Array} jobs 
     * @returns {Array<string>}
     */
    getUniqueCategories(jobs) {
        return [...new Set(jobs.map(job => job.industry || job.category).filter(Boolean))].sort();
    }
};
