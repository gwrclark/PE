
/**
 * Define custom job types here. 
 * You should define the type and a redirect function to append the corresponding
 * job number
 */
// eslint-disable-next-line no-unused-vars
const jobTypes = [
    {
        type: 'submission',
        redirectPath: (jobNumber) => `submission/${jobNumber}/quote`
    },
    {
        type: 'policyChange',
        redirectPath: (jobNumber) => `policychange/${jobNumber}/bind`
    }
];

module.exports = {
    /**
     * Function for handling the redirectPath from outside JobUtil
     * The called baked into JobUtil takes the following parameters
     * And should return a string
     * @param {String} type 
     * @param {String} jobNumber 
     * @returns {String}
     * See below for an example: 
     *     getRedirectPath: (type, jobNumber) => {
            const selectedJob = jobTypes.filter((jobType) => jobType.type === type);
            return selectedJob.redirectPath(jobNumber);
         }
     */
}