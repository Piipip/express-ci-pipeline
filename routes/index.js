var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CI/CD Pipeline Project',
    description: 'This project implements a fully automated Continuous Integration/Continuous Deployment (CI/CD) pipeline for a Node.js application using Jenkins, Docker, and GitHub.',
    architecture: 'The architecture involves Jenkins as the CI/CD tool, GitHub for version control, and Docker for containerization. Jenkins pulls the code from GitHub, builds the app into a Docker container, runs tests, and deploys the app.',
    report: {
      successes: 'Successfully automated the build, test, and deployment processes using Jenkins, Docker, and GitHub integration.',
      challenges: 'Faced issues with Jenkins-Docker integration initially and had to refine security configurations for the pipeline.',
      lessons: 'Learned the importance of robust pipeline design and error handling in CI/CD. Also gained experience with Docker containerization.',
      nextSteps: 'Plan to scale the pipeline by adding more stages and testing in a Kubernetes environment.'
    },
    conclusion: 'This CI/CD pipeline improved efficiency, allowing for seamless automated deployment. Future iterations will focus on optimizing performance and enhancing the testing phases.'
  });
});

module.exports = router;
