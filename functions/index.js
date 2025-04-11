const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

const db = admin.firestore();

exports.submitReview = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      console.log('Request body received:', req.body);

      const { mentorId, rating } = req.body;

      if (!mentorId || !rating) {
        console.error('Missing mentorId or rating');
        return res.status(400).send('Missing mentorId or rating');
      }

      const mentorRef = db.doc("mentors/" + mentorId);
      console.log('Fetching mentor document:', mentorRef.path);

      const mentorDoc = await mentorRef.get();
      if (!mentorDoc.exists) {
        console.error('Mentor document not found');
        return res.status(404).send('Mentor document not found');
      }

      const mentorData = mentorDoc.data();
      console.log('Current mentor data:', mentorData);

      const currentRatingSum = mentorData.ratingSum || 0;
      const currentReviewsCount = mentorData.totalReviews || 0;
      const newRatingSum = currentRatingSum + rating;
      const newReviewsCount = currentReviewsCount + 1;
      const newAverageRating = newRatingSum / newReviewsCount;

      console.log('Updating mentor rating:', newAverageRating);

      await mentorRef.update({
        rating: newAverageRating,
        ratingSum: newRatingSum,
        totalReviews: newReviewsCount,
      });

      console.log('Review successfully submitted');
      res.status(200).send("Review submitted successfully.");
    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).send(`Error submitting review: ${error.message}`);
    }
  });
});
